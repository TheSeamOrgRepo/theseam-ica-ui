import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import stripJsonComments from 'strip-json-comments'
import { Subject, Observable, from } from 'rxjs'
import { switchMap, auditTime, tap, delay } from 'rxjs/operators'

import { waitOnConditionAsync } from '../../../common/index'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { generatePdf } from '../../utils'
import { ISymbolOverlayItem } from '../../models/ica-contract-builder.models'

import { PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise, SVGGraphics } from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

import * as _pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

const pdfMake: any = _pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs

/**
 * TODO: Research 'svg' render mode more.
 */
export type PDFRenderTypes = 'svg' | 'canvas'

@Component({
  selector: 'ica-contract-preview-pdf',
  templateUrl: './ica-contract-preview-pdf.component.html',
  styleUrls: ['./ica-contract-preview-pdf.component.scss']
})
export class IcaContractPreviewPdfComponent implements OnInit, AfterViewInit {

  fading = false

  private _content: any
  private _data: any

  documentSymbols: any
  documentDefinition: any

  rendering = false
  renderType: PDFRenderTypes = 'canvas'

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
  set data(val: any) {
    this._data = (val && val.schemaData) ? val.schemaData : undefined
    this.updatePreview()
  }
  get data() { return this._data }

  @Output() fieldClicked = new EventEmitter<string>()

  @ViewChild('pdfContainer') pdfContainer: ElementRef
  @ViewChild('pdfCanvas') pdfCanvas: ElementRef
  @ViewChild('svgContainer') svgContainer: ElementRef

  private _svg

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) {
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
    // tslint:disable-next-line:max-line-length
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (pdfjsLib as any).version }/pdf.worker.min.js`

    this.render$ = this._renderRequestSubject.pipe(
      auditTime(500),
      tap(_ => this.fading = true),
      delay(100),
      switchMap(_ => from(waitOnConditionAsync(() => this.rendering === false, 30 * 1000))),
      switchMap(_ => from(this._renderPdf())),
      tap(_ => this.fading = false)
    )
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.render$.subscribe()
    this.updatePreview()
  }

  public overlaySymbolClick(item: ISymbolOverlayItem) {
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
    const pdfBuffer = await generatePdf(docDef, this.data)
    const loadingTask = pdfjsLib.getDocument({data: pdfBuffer})
    try {
      const pdf = await loadingTask.promise
      // console.log('PDF loaded', pdf)

      // Fetch the first page
      const pageNumber = 1
      const page = await pdf.getPage(pageNumber)
      // console.log('Page loaded', page)

      const w = this.pdfContainer.nativeElement.clientWidth
      const desiredWidth = w
      const viewport = page.getViewport(1)
      const scale = desiredWidth / viewport.width
      const scaledViewport = page.getViewport(scale)

      const annotations = await page.getAnnotations()

      this.symbolOverlayItems = this.getOverlayItems(annotations, scaledViewport, 2)


      if (this.renderType === 'canvas') {
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
      } else if (this.renderType === 'svg') {
        const opList = await page.getOperatorList()
        const svgGfx = new SVGGraphics(page.commonObjs, page.objs)
        const svg = await svgGfx.getSVG(opList, viewport)
        if (this._svg) { this.svgContainer.nativeElement.removeChild(this._svg) }
        this._svg = svg
        svg.style.width = '100%'
        svg.style.height = '100%'
        this.svgContainer.nativeElement.appendChild(svg)
      }

      // TODO: Allow canceling instead of only waiting
      // await renderTask.cancel()
      this.rendering = false
    } catch (err) {
      // PDF loading error
      console.error(err)
    }
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
        label: (pointerProps.hasOwnProperty('label'))
          ? pointerProps.label
          : ano.unsafeUrl,
        pointer: ano.unsafeUrl,
        fieldPointer: (pointerProps.hasOwnProperty('fieldPointer'))
          ? pointerProps.fieldPointer
          : ano.unsafeUrl
      })
    }

    return items
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
