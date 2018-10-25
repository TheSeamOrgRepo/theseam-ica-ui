import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { JsonPointer } from 'angular6-json-schema-form'
import stripJsonComments from 'strip-json-comments'
import { Subject, Observable, from } from 'rxjs'
import { tap, retryWhen, delay, switchMap, auditTime } from 'rxjs/operators'

import { waitOnConditionAsync } from '../../../common'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { pdfMakeGetBuffer } from '../../utils'
import { ISymbolOverlayItem } from '../../models/ica-contract-builder.models'

import { PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise } from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

import * as _pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'


const pdfMake: any = _pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'ica-contract-preview-pdf',
  templateUrl: './ica-contract-preview-pdf.component.html'
})
export class IcaContractPreviewPdfComponent implements OnInit, AfterViewInit {

  private _content: any
  private _data: any

  documentSymbols: any
  documentDefinition: any

  rendering = false

  public symbolOverlayItems: ISymbolOverlayItem[] = []

  private _renderRequestSubject = new Subject<void>()

  private render$: Observable<void>

  @Input()
  set content(val: string) {
    this._content = val
    if (val) {
      const json = JSON.parse(stripJsonComments(val))
      this.documentSymbols = json.symbols
      this.documentDefinition = json.documentDefinition
      this.updatePreview()
    }
  }
  get content() { return this._content }

  @Input()
  set data(val: object) { this._data = val; this.updatePreview() }
  get data() { return this._data }

  @Output() fieldClicked = new EventEmitter<string>()

  @ViewChild('pdfContainer') pdfContainer: ElementRef
  @ViewChild('pdfCanvas') pdfCanvas: ElementRef

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) {
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
    // tslint:disable-next-line:max-line-length
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (pdfjsLib as any).version }/pdf.worker.min.js`

    this.render$ = this._renderRequestSubject.pipe(
      auditTime(300),
      switchMap(_ => from(waitOnConditionAsync(() => this.rendering === false, 30 * 1000)))
    )
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.render$.subscribe(_ => this._renderPdf())
    this.updatePreview()
  }

  overlaySymbolClick(item: ISymbolOverlayItem) {
    this.fieldClicked.emit(item.fieldPointer)
  }

  public updatePreview() {
    this._renderRequestSubject.next()
  }

  private async _renderPdf() {
    if (!this.documentDefinition) { return }
    if (this.rendering) { return }
    this.rendering = true

    // TODO: Optimize this process to avoid to many conversions between `json` and `string`
    const docDef = JSON.parse(JSON.stringify(this.documentDefinition))
    if (this.data) {
      this.fillDocumentDefinitionSymbols(docDef, this.data)
    }


    const w = this.pdfContainer.nativeElement.clientWidth

    const pdfDocGenerator = pdfMake.createPdf(docDef)
    // console.log('pdfDocGenerator', pdfDocGenerator)
    const pdfBuffer = await pdfMakeGetBuffer(pdfDocGenerator)

    const loadingTask = pdfjsLib.getDocument({data: pdfBuffer})
    try {
      const pdf = await loadingTask.promise
      // console.log('PDF loaded', pdf)

      // Fetch the first page
      const pageNumber = 1
      const page = await pdf.getPage(pageNumber)
      // console.log('Page loaded', page)

      const desiredWidth = w
      const viewport = page.getViewport(1)
      const scale = desiredWidth / viewport.width
      const scaledViewport = page.getViewport(scale)

      const annotations = await page.getAnnotations()

      this.symbolOverlayItems = this.getOverlayItems(annotations, scaledViewport, 2)


      // Prepare canvas using PDF page dimensions
      const canvas: HTMLCanvasElement = this.pdfCanvas.nativeElement
      const context = canvas.getContext('2d')
      canvas.height = scaledViewport.height
      canvas.width = scaledViewport.width

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport
      }
      const renderTask = await page.render(renderContext)
      // TODO: Allow canceling instead of only waiting
      // await renderTask.cancel()
      this.rendering = false
    } catch (err) {
      // PDF loading error
      console.error(err)
    }
  }

  public findTextNode(textContent, text) {
    let node
    for (const item of textContent.items) {
      if (item.str === text) {
        node = item
      }
    }
    return node
  }

  public getOverlayItems(annotations, viewport, padding) {
    const items: ISymbolOverlayItem[] = []

    for (const ano of annotations) {
      const pointerProps = this.getPointerProps(ano.unsafeUrl)
      if (pointerProps.hasOwnProperty('noOverlay') && pointerProps.noOverlay === true) {
        continue
      }

      const anoRect = [
        ano.rect[0] - padding,
        ano.rect[1] - padding,
        (((ano.rect[2] - ano.rect[0]) < 40 ? ano.rect[0] + 40 : ano.rect[2])) + padding,
        ano.rect[3] + padding
      ]
      const rect = viewport.convertToViewportRectangle(anoRect)

      items.push({
        x: rect[0],
        y: rect[1] - (rect[1] - rect[3]),
        w: rect[2] - rect[0],
        h: rect[1] - rect[3],
        label: ano.unsafeUrl,
        pointer: ano.unsafeUrl,
        fieldPointer: (pointerProps.hasOwnProperty('fieldPointer'))
          ? pointerProps.fieldPointer
          : ano.unsafeUrl
      })
    }

    return items
  }

  public fillDocumentDefinitionSymbols(docDef: any, data: any): void {
    const dataMap = JsonPointer.dict(this.data)

    const walk = (obj) => {
      for (const key of Object.keys(obj)) {
        const item = obj[key]
        if (typeof(item) === 'object') {
          if (item.hasOwnProperty('link')) {
            const val = `${(dataMap[item.link]) ? dataMap[item.link] : ''}`
            if (item.hasOwnProperty('text')) {
              item.text = (val.length > 0) ? val : ' '
            } else if (item.hasOwnProperty('image')) {
              item.image = (val.length > 0)
                ? val
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII='
            }
          }

          walk(item)
        }
      }
    }

    walk(docDef)
  }

  public getPointerProps(pointer) {
    for (const symbol of this.documentSymbols) {
      if (symbol.pointer === pointer) {
        return symbol
      }
    }
  }

  onResized(event) {
    this.updatePreview()
  }

}
