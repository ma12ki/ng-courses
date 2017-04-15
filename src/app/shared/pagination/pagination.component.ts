import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'c-pagination',
  styleUrls: [ './pagination.component.scss' ],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  @Input() public offset: number;
  @Input() public itemsPerPage: number;
  @Input() public totalItems: number;
  @Output() public newOffset: EventEmitter<number> = new EventEmitter<number>();
  public currentPage: number = 1;
  public totalPages: number = 1;

  public ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = Math.ceil((this.offset + 1) / this.itemsPerPage);
  }

  public forward(): void {
    this.newOffset.emit(this.calculateNewOffset(this.offset, this.itemsPerPage, this.totalItems));
  }

  public back(): void {
    this.newOffset.emit(this.calculateNewOffset(this.offset, -this.itemsPerPage, this.totalItems));
  }

  private calculateNewOffset(offset: number, step: number, max: number): number {
    let newOffset = offset + step;
    if (newOffset < 0) {
      newOffset = 0;
    }
    if (newOffset > max) {
      newOffset = max;
    }
    return newOffset;
  }
}
