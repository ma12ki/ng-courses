import { DebugElement } from '@angular/core/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import * as moment from 'moment';

import { CourseHighlightDirective } from './course-highlight.directive';

@Component({
  selector: 'c',
  template: `
    <div [cHighlight]="date"></div>
  `
})
class TestComponent {
  public date: Date;
}

describe('course highlight directive', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHighlightDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('applies style for upcoming course', () => {
    fixture.componentInstance.date = moment().add(1, 'day').toDate();

    fixture.detectChanges();

    const styles = fixture.debugElement
      .query(By.directive(CourseHighlightDirective))
      .nativeElement.style;

    expect(styles.borderWidth).toEqual('2px');
    expect(styles.borderStyle).toEqual('solid');
    expect(styles.borderColor).toEqual('blue');
  });

  it('applies style for fresh course', () => {
    fixture.componentInstance.date = moment().subtract(1, 'day').toDate();

    fixture.detectChanges();

    const styles = fixture.debugElement
      .query(By.directive(CourseHighlightDirective))
      .nativeElement.style;

    expect(styles.borderWidth).toEqual('2px');
    expect(styles.borderStyle).toEqual('solid');
    expect(styles.borderColor).toEqual('green');
  });

  it('does NOT apply style for old course', () => {
    fixture.componentInstance.date = moment().subtract(15, 'days').toDate();

    fixture.detectChanges();

    const styles = fixture.debugElement
      .query(By.directive(CourseHighlightDirective))
      .nativeElement.style;

    expect(styles.borderWidth).toEqual('');
    expect(styles.borderStyle).toEqual('');
    expect(styles.borderColor).toEqual('');
  });
});
