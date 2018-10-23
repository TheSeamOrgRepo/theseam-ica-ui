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
      width: 60px;
      height: 30px;
      border: 1px solid cyan;
    }
  `]
})
export class IcaContractPreviewPdfComponent implements OnInit {

  private _content: any
  private _data: any

  documentSymbols: any
  documentDefinition: any

  rendering = false
  highlightX = 0
  highlightY = 0
  highlightW = 0
  highlightH = 0

  @Input()
  set content(val: string) {
    this._content = val
    if (val) {
      // console.log('val', val)
      const json = JSON.parse(stripJsonComments(val))
      // console.log('json', json)
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

  previewClick(event: MouseEvent) {
    // const isFocusable = (event.target as any).classList.contains('tpl-focusable')
    // // console.log('isFocusable', isFocusable)
    // if (!isFocusable) {
    //   return
    // }
    // // console.log(event)
    // // console.log(event.target)
    // let value: string = (event.target as any).innerHTML
    // // console.log('value', value)

    // if (value.indexOf('{=') !== 0) {
    //   value = (event.target as any).getAttribute('data-pointer')
    //   // console.log('value1', value)
    // } else {
    //   value = value.substring(2, value.length - 1)
    // }


    // this.fieldClicked.emit(value)
  }

  public updatePreview() {
    console.log('updatePreview')
    this.updatePreviewPdf()
  }

  public async updatePreviewPdf() {
    if (!this.documentDefinition) { return }
    if (this.rendering) { return }
    this.rendering = true

    // TODO: Optimize this process to avoid to many conversions between `json` and `string`
    let docDef = JSON.parse(JSON.stringify({ ...this.documentDefinition }))
    if (this.data) {
      // console.log('docDef before', docDef)
      let docDefStr = JSON.stringify(docDef)
      docDefStr = this.fillDocumentDefinitionSymbols(docDefStr, this.data)
      docDefStr = this.replaceAllSymbols(docDefStr, this.documentSymbols, '')
      docDef = JSON.parse(docDefStr)
      // console.log('filled dd:', JSON.parse(JSON.stringify(docDef)))
    }


    const w = this.pdfContainer.nativeElement.clientWidth

    const pdfDocGenerator = pdfMake.createPdf(docDef)
    const pdfBuffer = await pdfMakeGetBuffer(pdfDocGenerator)

    const loadingTask = pdfjsLib.getDocument({data: pdfBuffer})
    try {
      const pdf = await loadingTask.promise
        // console.log('PDF loaded')

        // Fetch the first page
        const pageNumber = 1
        const page = await pdf.getPage(pageNumber)
        // console.log('Page loaded')

        const desiredWidth = w
        const viewport = page.getViewport(1)
        const scale = desiredWidth / viewport.width
        const scaledViewport = page.getViewport(scale)
        // console.log('scaledViewport', scaledViewport)

        const textContent = await page.getTextContent()
        // console.log('textContent', textContent)
        const textNode = this.findTextNode(textContent, 'Players ')
        // console.log('textNode', textNode)

        // const point = scaledViewport.convertToViewportPoint(textNode.transform[4], textNode.transform[5])
        // console.log('point', point)
        // this.highlightX = point[0]
        // this.highlightY = point[1]

        const padding = 2

        // const tm = textNode.transform
        // const height = Math.sqrt(tm[2] * tm[2] + tm[3] * tm[3])
        // console.log('height', height)
        const rect = scaledViewport.convertToViewportRectangle([
          textNode.transform[4] - padding, textNode.transform[5] - padding, textNode.width + (padding * 2), textNode.height + (padding * 2)
        ])
        // console.log('rect', rect)
        const _h = scaledViewport.height - rect[3]
        this.highlightX = rect[0]
        this.highlightY = rect[1] - _h
        this.highlightW = rect[2]
        this.highlightH = _h

        // console.log('this.highlightX', this.highlightX)
        // console.log('this.highlightY', this.highlightY)
        // console.log('this.highlightW', this.highlightW)
        // console.log('this.highlightH', this.highlightH)


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

  public getRectOnCanvas(viewport, textNode) {

  }

  public fillDocumentDefinitionSymbols(docDef: any, data: any): string {
    let docDefTmp = docDef
    const dataMap = JsonPointer.dict(this.data)
    // console.log('dataMap', dataMap)
    for (const key of Object.keys(dataMap)) {
      // console.log('key', key, '  ', dataMap[key])
      const symbol = this.getPointerSymbol(key)
      // console.log('symbol', symbol)
      docDefTmp = docDefTmp.replace(`{=${symbol}}`, dataMap[key])
    }
    return docDefTmp
  }

  public replaceAllSymbols(docDef: any, docSymbols: any, newVal: string): string {
    let docDefTmp = docDef
    for (const item of docSymbols) {
      docDefTmp = docDefTmp.replace(`{=${item.label}}`, newVal)
    }
    return docDefTmp
  }

  public getPointerSymbol(pointer) {
    for (const symbol of this.documentSymbols) {
      if (symbol.pointer === pointer) {
        return symbol.label
      }
    }
  }



  onResized(event) {
    // console.log('onResized', event)
    this.updatePreviewPdf()
  }

}
