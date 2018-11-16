import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core'


/** The default page size if there is no page size and there are no provided page size options. */
const DEFAULT_PAGE_SIZE = 50

/**
 * Change event object that is emitted when the user selects a
 * different page size or navigates to another page.
 */
export class PageEvent {
  /** The current page index. */
  pageIndex: number

  /**
   * Index of the page that was selected previously.
   */
  previousPageIndex: number

  /** The current page size */
  pageSize: number

  /** The current total number of items being paged */
  length: number
}

@Component({
  selector: 'ica-table-pagination',
  templateUrl: './ica-table-pagination.component.html',
  styleUrls: ['./ica-table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IcaTablePaginationComponent implements OnInit {

  /**
   * Number of elements being paged
   */
  @Input()
  get length() { return this._length }
  set length(value: number) {
    this._length = value
    this._changeDetectorRef.markForCheck()
  }
  private _length = 0

  /**
   * Size of a page
   */
  @Input()
  get pageSize() { return this._pageSize }
  set pageSize(value: number) {
    this._pageSize = value
    this._changeDetectorRef.markForCheck()
  }
  private _pageSize: number = DEFAULT_PAGE_SIZE

  /**
   * Index of active page
   */
  @Input()
  get pageIndex() { return this._pageIndex }
  set pageIndex(value: number) {
    this._pageIndex = value
    this._changeDetectorRef.markForCheck()
  }
  private _pageIndex = 0

  /**
   *
   */
  @Input()
  get disabled() { return this._disabled }
  set disabled(value: boolean) {
    this._disabled = value
    this._changeDetectorRef.markForCheck()
  }
  private _disabled = false

  /**
   * Event emitted when the paginator changes the page size or page index.
   */
  @Output() readonly page = new EventEmitter<PageEvent>()

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  /**
   * Advances to the next page if it exists.
   */
  public nextPage(): void {
    if (!this.hasNextPage()) { return }

    const previousPageIndex = this.pageIndex
    this.pageIndex++
    this._emitPageEvent(previousPageIndex)
  }

  /**
   * Move back to the previous page if it exists.
   */
  public previousPage(): void {
    if (!this.hasPreviousPage()) { return }

    const previousPageIndex = this.pageIndex
    this.pageIndex--
    this._emitPageEvent(previousPageIndex)
  }

  /**
   * Move to the first page if not already there.
   */
  public firstPage(): void {
    // hasPreviousPage being false implies at the start
    if (!this.hasPreviousPage()) { return }

    const previousPageIndex = this.pageIndex
    this.pageIndex = 0
    this._emitPageEvent(previousPageIndex)
  }

  /**
   * Move to the last page if not already there.
   */
  public lastPage(): void {
    // hasNextPage being false implies at the end
    if (!this.hasNextPage()) { return }

    const previousPageIndex = this.pageIndex
    this.pageIndex = this.getNumberOfPages() - 1
    this._emitPageEvent(previousPageIndex)
  }

  /**
   * Whether there is a previous page.
   */
  public hasPreviousPage(): boolean {
    return this.pageIndex >= 1 && this.pageSize !== 0
  }

  /**
   * Whether there is a next page.
   */
  public hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages() - 1
    return this.pageIndex < maxPageIndex && this.pageSize !== 0
  }

  /**
   * Calculate the number of pages
   */
  public getNumberOfPages(): number {
    if (!this.pageSize) {
      return 0
    }

    return Math.ceil(this.length / this.pageSize)
  }

  /**
   *
   */
  public getRangeLabel(pageIndex: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) { return `0 of ${length}` }

    length = Math.max(length, 0)

    const startIndex = pageIndex * pageSize

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize

    return `${startIndex + 1} - ${endIndex} of ${length}`
  }

  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  public changePageSize(pageSize: number) {
    // Current page needs to be updated to reflect the new page size. Navigate to the page
    // containing the previous page's first item.
    const startIndex = this.pageIndex * this.pageSize
    const previousPageIndex = this.pageIndex

    this.pageIndex = Math.floor(startIndex / pageSize) || 0
    this.pageSize = pageSize
    this._emitPageEvent(previousPageIndex)
  }

  /** Checks whether the buttons for going forwards should be disabled. */
  public nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage()
  }

  /** Checks whether the buttons for going backwards should be disabled. */
  public previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage()
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private _emitPageEvent(previousPageIndex: number) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    })
  }

}
