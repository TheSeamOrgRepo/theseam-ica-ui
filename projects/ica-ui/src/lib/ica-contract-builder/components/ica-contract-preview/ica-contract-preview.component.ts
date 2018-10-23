import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { JsonPointer } from 'angular6-json-schema-form'

import { IcaContractBuilderService } from '../../services/ica-contract-builder.service'
import { getTemplateJsonPointers, addTemplateHoverActions, setTemplateJsonPointerValue } from './../../utils/html-template-utils'

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


const data = {
  addr1: '3400 Players Club Parkway',
  addr2: 'Suite 210',
  addr3: 'Memphis, TN 38125',

  phone: '(901) 374-0374',
  tollFree: '(877) 280-3413',
  fax: '(901) 684-1998',

  contractNumber: '501309-501132-102079',

  buyer: [
      'Beijing Cotton Outlook Consulting Co Ltd',
      'Room 511, Tower B,',
      'Global Finance & News Center',
      'Xuanwumen Outer Street',
      '',
      'Phone: 86 108 808 6622',
      'Fax: 86 108 808 6617'
  ],

  seller: [
      'Abeni Surveyors Ltda',
      'Avenida Conselheiro Nebias',
      'Nr.532 - sala 62',
      '',
      'Santos',
      'Phone: 55 13 3213 1700',
      'Fax: 55 133 216 1443'
  ],

  date: 'Thu Sep 20 2018 11:42:03 GMT-0500',

  quantity: [
      'About 2000 Metric Tons',
      '0 percent variation in weight allowed at \'s option.'
  ]
}

const middleLeftWidth = 70

const dd = {
  content: [
    // Header
    {
      columns: [
        {
          image: 'data:image/png;base64,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',
          fit: [100, 100],
          width: '*'
        },
        // Address
        {
          text: data.addr1 + '\n' + data.addr2 + '\n' + data.addr3,
          fontSize: 9,
          width: 'auto'
        },
        // Phone numbers
        {
          text: 'Phone: ' + data.phone + '\nToll Free: ' + data.tollFree + '\nFax: ' + data.fax,
          fontSize: 9,
          width: 'auto'
        }
      ],
      columnGap: 20
    },
    // {
    //   canvas: [
    //     {
    //       type: 'line',
    //       x1: 0, y1: 10,
    //       x2: 573, y2: 10,
    //       lineWidth: 1
    //     }
    //   ]
    // },
    {
      text: '_________________________________________________________________________________________________________'
    },
    // Sales contract
    {
      text: [
        { text: 'Sales Contract: ', bold: true },
        data.contractNumber
      ],
      margin: [ 0, 5, 0, 0],
      fontSize: 10
    },
    // Buyer/Seller columns
    {
      // Label columns
      columns: [
        {
          text: 'Seller:',
          fontSize: 10,
          bold: true,
          width: '*',
          margin: [ 15, 0, 0, 0]
        },
        {
          text: 'Buyer:',
          fontSize: 10,
          bold: true,
          width: '*',
          margin: [ 15, 0, 0, 0]
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    {
      // Content Columns
      columns: [
        {
          text: [
            data.buyer[0] + '\n',
            data.buyer[1] + '\n',
            data.buyer[2] + '\n',
            data.buyer[3] + '\n',
            data.buyer[4] + '\n',
            data.buyer[5] + '\n',
            data.buyer[6] + '\n'
          ],
          fontSize: 10,
          width: '*',
          margin: [ 25, 0, 0, 0]
        },
        {
          text: [
            data.seller[0] + '\n',
            data.seller[1] + '\n',
            data.seller[2] + '\n',
            data.seller[3] + '\n',
            data.seller[4] + '\n',
            data.seller[5] + '\n',
            data.seller[6] + '\n'
          ],
          fontSize: 10,
          width: '*',
          margin: [ 25, 0, 0, 0]
        }
      ],
      columnGap: 20,
      margin: [ 0, 5, 0, 0]
    },
    // Date
    {
      text: [
        { text: 'Date: ', bold: true },
        data.date
      ],
      margin: [ 0, 10, 0, 0],
      fontSize: 10
    },
    // Quantity
    {
      columns: [
        {
          text: 'Quantity:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [ data.quantity[0] + '\n' + data.quantity[1] ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    }
  ],
  pageMargins: [ 20, 15, 20, 20 ],
  pageSize: 'LETTER'
}



@Component({
  selector: 'ica-contract-preview',
  templateUrl: './ica-contract-preview.component.html',
  styles: []
})
export class IcaContractPreviewComponent implements OnInit {

  private _content: string
  private _data: object

  public formattedContent = ''

  rendering = false

  @Input()
  set content(val: string) { this._content = val; setTimeout(() => this.updatePreview()) }
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
    // const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
    console.log('pdfMake', pdfMake, pdfFonts)
    // pdfMake.createPdf(docDefinition).open()

    const pdfData = atob(
      'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
      'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
      'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
      'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
      'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
      'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
      'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
      'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
      'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
      'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
      'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
      'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
      'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G')

    console.log('pdfjsLib', pdfjsLib)

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    // const pdfjsLib = window['/assets/pdf.worker.js']

    // The workerSrc property shall be specified.
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'

    // Using DocumentInitParameters object to load binary data.
    // const loadingTask = pdfjsLib.getDocument({data: pdfData})
    // loadingTask.promise.then(function(pdf) {
    //   console.log('PDF loaded')

    //   // Fetch the first page
    //   const pageNumber = 1
    //   pdf.getPage(pageNumber).then(function(page) {
    //     console.log('Page loaded')

    //     const scale = 1.5
    //     const viewport = page.getViewport(scale)

    //     // Prepare canvas using PDF page dimensions
    //     const canvas: any = document.getElementById('the-canvas')
    //     const context = canvas.getContext('2d')
    //     canvas.height = viewport.height
    //     canvas.width = viewport.width

    //     // Render PDF page into canvas context
    //     const renderContext = {
    //       canvasContext: context,
    //       viewport: viewport
    //     }
    //     const renderTask = page.render(renderContext)
    //     renderTask.then(function () {
    //       console.log('Page rendered')
    //     })
    //   })
    // }, function (reason) {
    //   // PDF loading error
    //   console.error(reason)
    // })

    // this.renderPdf()
    this.updatePreviewPdf()
  }

  async renderPdf() {



    // const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
    // console.log('pdfMake', pdfMake, pdfFonts)
    // // pdfMake.createPdf(docDefinition).open()
    // // const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    // const pdfDocGenerator = pdfMake.createPdf(dd)
    // const pdfBuffer = await pdfMakeGetBuffer(pdfDocGenerator)

    // const loadingTask = pdfjsLib.getDocument({data: pdfBuffer})
    // loadingTask.promise.then(function(pdf) {
    //   console.log('PDF loaded')

    //   // Fetch the first page
    //   const pageNumber = 1
    //   pdf.getPage(pageNumber).then(function(page) {
    //     console.log('Page loaded')

    //     // const scale = 1.5
    //     // const viewport = page.getViewport(scale)

    //     const desiredWidth = 678.81
    //     const viewport = page.getViewport(1)
    //     const scale = desiredWidth / viewport.width
    //     const scaledViewport = page.getViewport(scale)

    //     // Prepare canvas using PDF page dimensions
    //     const canvas: any = document.getElementById('the-canvas')
    //     const context = canvas.getContext('2d')
    //     canvas.height = scaledViewport.height
    //     canvas.width = scaledViewport.width

    //     // Render PDF page into canvas context
    //     const renderContext = {
    //       canvasContext: context,
    //       viewport: scaledViewport
    //     }
    //     const renderTask = page.render(renderContext)
    //     renderTask.then(function () {
    //       console.log('Page rendered')
    //     })
    //   })
    // }, function (reason) {
    //   // PDF loading error
    //   console.error(reason)
    // })
  }

  previewClick(event: MouseEvent) {
    const isFocusable = (event.target as any).classList.contains('tpl-focusable')
    // console.log('isFocusable', isFocusable)
    if (!isFocusable) {
      return
    }
    // console.log(event)
    // console.log(event.target)
    let value: string = (event.target as any).innerHTML
    // console.log('value', value)

    if (value.indexOf('{=') !== 0) {
      value = (event.target as any).getAttribute('data-pointer')
      // console.log('value1', value)
    } else {
      value = value.substring(2, value.length - 1)
    }


    this.fieldClicked.emit(value)
  }

  public updatePreview() {
    // console.log('updatePreview')
    const val = this.content
    const res = getTemplateJsonPointers(val)
    // console.log('res', res)

    let newContent = addTemplateHoverActions(val, res)

    if (this.data) {
      // console.log('this.data', this.data)
      const dataMap = JsonPointer.dict(this.data)
      // console.log('dataMap', dataMap)
      for (const key of Object.keys(dataMap)) {
        // console.log('key', key, '  ', dataMap[key])
        newContent = setTemplateJsonPointerValue(newContent, key, dataMap[key])
      }
    }

    this.formattedContent = newContent
  }

  public async updatePreviewPdf() {
    if (this.rendering) {
      return
    }
    this.rendering = true
    const w = this.pdfContainer.nativeElement.clientWidth
    const h = this.pdfContainer.nativeElement.clientHeight
    console.log('w', w)

    const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
    console.log('pdfMake', pdfMake, pdfFonts)
    // pdfMake.createPdf(docDefinition).open()
    // const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    const pdfDocGenerator = pdfMake.createPdf(dd)
    const pdfBuffer = await pdfMakeGetBuffer(pdfDocGenerator)

    const loadingTask = pdfjsLib.getDocument({data: pdfBuffer})
    loadingTask.promise.then((pdf) => {
      console.log('PDF loaded')

      // Fetch the first page
      const pageNumber = 1
      pdf.getPage(pageNumber).then((page) => {
        console.log('Page loaded')

        // const scale = 1.5
        // const viewport = page.getViewport(scale)

        const desiredWidth = w
        const viewport = page.getViewport(1)
        const scale = desiredWidth / viewport.width
        const scaledViewport = page.getViewport(scale)

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
        const renderTask = page.render(renderContext)
        renderTask.then(() => {
          console.log('Page rendered')
          this.rendering = false
          setTimeout(() => {
            if (this.pdfContainer.nativeElement.clientWidth !== w) {
              this.updatePreviewPdf()
            }
          })
        })
      })
    }, function (reason) {
      // PDF loading error
      console.error(reason)
    })
  }



  onResized(event) {
    console.log('onResized', event)
    this.updatePreviewPdf()
  }

}
