import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { JsonPointer } from 'angular6-json-schema-form'
import stripJsonComments from 'strip-json-comments'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'

import { PDFDocumentProxy, PDFViewerParams, PDFPageProxy, PDFSource, PDFProgressData, PDFPromise } from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

import * as _pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

const pdfMake: any = _pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs

export interface ISymbolOverlayItem {
  x: number
  y: number
  w: number
  h: number
  label: string
  pointer: string
  fieldPointer: string
}

const pdfMakeGetBuffer = async (pdfMakeRef) => {
  return new Promise((resolve, reject) => {
    pdfMakeRef.getBuffer((buf) => {
      resolve(buf)
    })
  })
}

@Component({
  selector: 'ica-contract-preview-pdf',
  templateUrl: './ica-contract-preview-pdf.component.html',
  styles: [`
    .highlight-rect {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 9px;
      color: transparent;
      max-width: 60px;
    }

    .highlight-rect:hover {
      border: 2px solid cyan;
      border-radius: 2px;
      color: cyan;
      background-color: rgba(30,30,30,0.5);
      max-width: 100%;
      cursor: pointer;
    }
  `]
})
export class IcaContractPreviewPdfComponent implements OnInit {

  private _content: any
  private _data: any

  documentSymbols: any
  documentDefinition: any

  rendering = false

  public symbolOverlayItems: ISymbolOverlayItem[] = []

  @Input()
  set content(val: string) {
    this._content = val
    if (val) {
      const json = JSON.parse(stripJsonComments(val))
      this.documentSymbols = json.symbols
      this.documentDefinition = json.documentDefinition
      setTimeout(() => this.updatePreview())
    }
  }
  get content() { return this._content }

  @Input()
  set data(val: object) { this._data = val; setTimeout(() => this.updatePreview()) }
  get data() { return this._data }

  @Output() fieldClicked = new EventEmitter<string>()

  @ViewChild('pdfContainer') pdfContainer: ElementRef

  constructor(
    public icaCntBuilder: IcaContractBuilderService
  ) {
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
    // tslint:disable-next-line:max-line-length
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (pdfjsLib as any).version }/pdf.worker.min.js`
  }

  ngOnInit() {
    this.updatePreviewPdf()
  }

  overlaySymbolClick(event: MouseEvent, item: ISymbolOverlayItem) {
    this.fieldClicked.emit(item.fieldPointer)
  }

  public updatePreview() {
    // console.log('updatePreview')
    this.updatePreviewPdf()
  }

  public async updatePreviewPdf() {
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
      const canvas: any = document.getElementById('the-canvas')
      const context = canvas.getContext('2d')
      canvas.height = scaledViewport.height
      canvas.width = scaledViewport.width

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport
      }
      await page.render(renderContext)
      // console.log('Page rendered')
      this.rendering = false
      setTimeout(() => {
        if (this.pdfContainer.nativeElement.clientWidth !== w) {
          this.updatePreviewPdf()
        }
      })
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
      const anoRect = [
        ano.rect[0] - padding,
        ano.rect[1] - padding,
        (((ano.rect[2] - ano.rect[0]) < 40 ? ano.rect[0] + 40 : ano.rect[2])) + padding,
        ano.rect[3] + padding
      ]
      const rect = viewport.convertToViewportRectangle(anoRect)

      const pointerProps = this.getPointerProps(ano.unsafeUrl)

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
            const val = `${(dataMap[item.link]) ? dataMap[item.link] : ' '}`
            if (item.hasOwnProperty('text')) {
              item.text = (val.length > 0) ? val : ' '
            } else if (item.hasOwnProperty('image')) {
              item.image = (val.length > 0) ? val : ' '
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
    // console.log('onResized', event)
    this.updatePreviewPdf()
  }

}
