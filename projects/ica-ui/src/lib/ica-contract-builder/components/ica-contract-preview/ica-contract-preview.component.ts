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

// tslint:disable:max-line-length
const data = {
  // {=/Contract/ReferenceNumber}
  contractNumber: '501309-501132-102079',

  buyer: [
    // {=/Contract/Buyer/Name}
    'Beijing Cotton Outlook Consulting Co Ltd',
    // {=/Contract/Buyer/Addresses/Item/0/AddressStreet1}
    'Room 511, Tower B,',
    // {=/Contract/Buyer/Addresses/Item/0/AddressStreet2}
    'Global Finance & News Center',
    // {=/Contract/Buyer/Addresses/Item/0/AddressStreet3}
    'Xuanwumen Outer Street',
    // {=/Contract/Buyer/Addresses/Item/0/Town}
    '',
    // {=/Contract/Buyer/Telephone}
    '86 108 808 6622',
    // {=/Contract/Buyer/Fax}
    '86 108 808 6617'
  ],

  seller: [
    // {=/Contract/Seller/Name}
    'Abeni Surveyors Ltda',
    // {=/Contract/Seller/Addresses/Item/0/AddressStreet1}
    'Avenida Conselheiro Nebias',
    // {=/Contract/Seller/Addresses/Item/0/AddressStreet2}
    'Nr.532 - sala 62',
    // {=/Contract/Seller/Addresses/Item/0/AddressStreet3}
    '',
    // {=/Contract/Seller/Addresses/Item/0/Town}
    'Santos',
    // {=/Contract/Seller/Telephone}
    '55 13 3213 1700',
    // {=/Contract/Seller/Fax}
    '55 133 216 1443'
  ],

  // {=/Contract/Date}
  date: 'Thu Sep 20 2018 11:42:03 GMT-0500',

  quantity: {
    // {=/Contract/Terms/Quantity/ContractedUnits}
    contractedUnits: '2000',
    // {=/Contract/Terms/Quantity/QuantityType}
    contractedType: 'Metric Tons',
    // {=/Contract/Terms/Quantity/VariationPercent}
    variationPercent: '0',
    // {=/Contract/Terms/Quantity/VariationOption}
    variationOption: 'Buyer'
  },

  quality: {
    // {=/Contract/Specifications/CropYear}
    cropYear: '2018',
    // {=/Contract/Specifications/GrowthOrigin}
    growthOrigin: '123',
    // {=/Contract/Specifications/GradeDescription}
    gradeDescription: 'Good',
    // {=/Contract/Specifications/Staple}
    staple: 'Yes',
    micronaire: {
      // {=/Contract/Specifications/MinMicronaire}
      min: '1',
      // {=/Contract/Specifications/MaxMicronaire}
      max: '50',
      // {=/Contract/Specifications/MicronaireMemo}
      memo: 'Other'
    },
    // {=/Contract/Specifications/MinStrength}
    minStrength: '10'
  },

  terms: {
    // {=/Contract/Pricing/UnitPrice}
    unitPrice: '3',
    // {=/Contract/Pricing/PricePoints}
    pricePoints: '2',
    // {=/Contract/Pricing/PriceBase}
    priceBase: 'lb',
    // {=/Contract/Pricing/FixationCallMonth}
    fixationCallMonth: 'Jan',
    // {=/Contract/Pricing/FixationCallYear}
    fixationCallYear: '2018',
    // {=/Contract/Pricing/OtherPriceMemo}
    otherPriceMemo: 'Other'
  },

  payment: {
    // {=/Contract/Terms/PaymentTerms/Description}
    description: 'Selling something'
  },

  shipment: {
    // {=/Contract/Terms/ShipmentPeriods/Shipment}
    period: '1'
  },

  freight: {
    // {=/Contract/Terms/FreightBasis/Description}
    description: 'Sending something'
  },

  specialClauses: [
    // {=/Contract/Terms/SpecialClauses/Item/0/Description}
    'Clause 1',
    // {=/Contract/Terms/SpecialClauses/Item/1/Description}
    'Clause 2',
    // {=/Contract/Terms/SpecialClauses/Item/2/Description}
    'Clause 3',
    // {=/Contract/Terms/SpecialClauses/Item/3/Description}
    'Clause 4'
  ],

  sellerSignature: 'data:image/png;base64,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'
}

const middleLeftWidth = 110

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
          text: '3400 Players Club Parkway\nSuite 210\nMemphis, TN 38125',
          fontSize: 9,
          width: 'auto'
        },
        // Phone numbers
        {
          text: 'Phone: (901) 374-0374\nToll Free: (877) 280-3413\nFax: (901) 684-1998',
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
            'Phone: ' + data.buyer[5] + '\n',
            'Fax: ' + data.buyer[6] + '\n'
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
            'Phone: ' + data.seller[5] + '\n',
            'Fax: ' + data.seller[6] + '\n'
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
          text: [ 'About ' + data.quantity.contractedUnits  + ' ' + data.quantity.contractedUnits
                    + '\n' + data.quantity.variationPercent + ' percent variation in weight allowed at '
                    + data.quantity.variationOption + '\'s option' ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Quality
    {
      columns: [
        {
          text: 'Growth/Quality:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            'Crop Year: ' + data.quality.cropYear + '\n',
            'Growth: ' + data.quality.growthOrigin + '\n',
            'Grade: ' + data.quality.gradeDescription + '\n',
            'Staple: ' + data.quality.staple + '\n',
            'Micronaire: ' + data.quality.micronaire.min + '-' + data.quality.micronaire.max + '(' + data.quality.micronaire.memo + ')' + '\n',
            'Strength GPT: ' + data.quality.minStrength
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Price/Terms
    {
      columns: [
        {
          text: 'Price/Terms:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            data.terms.unitPrice + ' ' + data.terms.priceBase + '\n',
            data.terms.pricePoints + ' ' + data.terms.priceBase + '\n',
            'ON ' + data.terms.fixationCallMonth + data.terms.fixationCallYear + data.terms.otherPriceMemo
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Payment
    {
      columns: [
        {
          text: 'Payment:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            data.payment.description
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Shipment
    {
      columns: [
        {
          text: 'Shipment:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            data.shipment.period
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Freight
    {
      columns: [
        {
          text: 'Freight:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            data.freight.description
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Insurance
    {
      columns: [
        {
          text: 'Insurance:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Export Duty or Subsidy
    {
      columns: [
        {
          text: 'Export Duty or Subsidy:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Special Clauses
    {
      columns: [
        {
          text: 'Special Clauses:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            data.specialClauses[0] + '\n',
            data.specialClauses[1] + '\n',
            data.specialClauses[2] + '\n',
            data.specialClauses[3]
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // General
    {
      columns: [
        {
          text: 'General:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            '* This contract incorporated the bylaws and rules of The International Cotton Association Ltd. ',
            'as they were when the contract was agreed.' + '\n',
            '* The conditions below are an ingral part of this contract.' + '\n',
            '* This contract cannot be changed unless we agree in writing.' + '\n',
            '* This contract cannot be cancelled for any reason.'
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Arbitration
    {
      columns: [
        {
          text: 'Arbitration:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        },
        {
          text: [
            '* All disputes relating to this contract will be resolved through arbitration in accordance with the bylaws ',
            'of the International Cotton Association Ltd.' + '\n',
            '* This agreement incorporated the bylaws which set out the Association\'s arbitration procedure.' + '\n',
            '* You must not take legal action against us over a dispute suitable for arbitration, other than to obtain security ',
            'for any claim, unless you have first obtained an arbitration award from the International Cotton Association Ltd. ',
            'and exhausted all means of appeal allowed by the Association\'s bylaws. This also applies to us.'
          ],
          fontSize: 10,
          width: '*'
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    // Seller Signature
    {
      columns: [
        {
          text: 'Seller Signature:',
          fontSize: 10,
          bold: true,
          width: middleLeftWidth
        }
      ],
      columnGap: 20,
      margin: [ 0, 10, 0, 0]
    },
    {
      image: data.sellerSignature,
      fit: [100, 100],
      width: '*'
    },
    {
      text: '---------------------------------'
    }
  ],
  pageMargins: [ 20, 15, 20, 20 ],
  pageSize: 'LETTER'
}
// tslint:enable:max-line-length



@Component({
  selector: 'ica-contract-preview',
  templateUrl: './ica-contract-preview.component.html',
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
export class IcaContractPreviewComponent implements OnInit {

  private _content: string
  private _data: any
  private _pdfTemplate: any

  public formattedContent = ''

  rendering = false
  highlightX = 0
  highlightY = 0
  highlightW = 0
  highlightH = 0

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
    this.updatePreviewPdf()
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
    if (this.rendering) { return }
    this.rendering = true
    const w = this.pdfContainer.nativeElement.clientWidth

    const pdfDocGenerator = pdfMake.createPdf(dd)
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
        const textNode = this.findTextNode(textContent, 'Santos')
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



  onResized(event) {
    // console.log('onResized', event)
    this.updatePreviewPdf()
  }

}
