import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[cHighlight]'
})
export class CourseHighlightDirective implements OnInit {
  // tslint:disable:no-input-rename
  @Input('cHighlight') private date: Date;

  constructor(private el: ElementRef) { }

  public ngOnInit() {
    this.applyBorder();
  }

  private applyBorder(): void {
    const now = moment();

    if (this.isUpcoming(now)) {
      this.el.nativeElement.style.borderWidth = '2px';
      this.el.nativeElement.style.borderStyle = 'solid';
      this.el.nativeElement.style.borderColor = 'blue';
    } else if (this.isFresh(now)) {
      this.el.nativeElement.style.borderWidth = '2px';
      this.el.nativeElement.style.borderStyle = 'solid';
      this.el.nativeElement.style.borderColor = 'green';
    }
  }

  private isFresh(now: moment.Moment): boolean {
    return moment(this.date).isSameOrBefore(now) &&
      moment(this.date).isSameOrAfter(moment(now).subtract(14, 'days'));
  }

  private isUpcoming(now: moment.Moment): boolean {
    return moment(this.date).isAfter(now);
  }
}
