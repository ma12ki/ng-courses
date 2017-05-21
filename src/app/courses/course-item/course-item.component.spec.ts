import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment';

import { CourseDurationPipe } from '../shared/course-helpers/course-duration.pipe';
import { ICourse } from '../shared/course.entity';
import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  let fixture: ComponentFixture<CourseItemComponent>;
  let component: CourseItemComponent;
  let element: DebugElement;
  let course: ICourse;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MomentModule ],
      declarations: [ CourseItemComponent, CourseDurationPipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    // @Inputs and OnPush are not working correctly during tests
    // see https://github.com/angular/angular/issues/12313
    .overrideComponent(CourseItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  beforeEach(() => {
    course = {
      id: 1,
      title: 'how to become a super saiyan',
      description: '10 easy steps',
      date: new Date(),
      durationMinutes: 10,
      topRated: true,
      authors: [ 1, 2 ],
    };

    component.course = course;

    fixture.detectChanges();
  });

  it('adds "top-rated" class for top rated course', () => {
    component.course = {
      ...component.course,
      topRated: true,
    };

    fixture.detectChanges();

    const classes = element.query(By.css('.course-item')).classes;

    expect(classes['top-rated']).toBe(true);
  });

  it('does NOT add "top-rated" class for non-top rated course', () => {
    component.course = {
      ...component.course,
      topRated: false,
    };

    fixture.detectChanges();

    const classes = fixture.debugElement.query(By.css('.course-item')).classes;

    expect(classes['top-rated']).toBe(false);
  });

  it('prints UPPERCASED course title', () => {
    const text = element.query(By.css('.title')).nativeElement.textContent;

    expect(text).toContain(course.title.toUpperCase());
  });

  it('prints course duration', () => {
    const text = element.query(By.css('.length')).nativeElement.textContent;

    expect(text).toContain(course.durationMinutes);
  });

  it('prints formatted date', () => {
    const text = element.query(By.css('.date')).nativeElement.textContent;

    expect(text).toContain(moment(course.date).format('DD.MM.YYYY'));
  });

  it('prints description', () => {
    const text = element.query(By.css('.description')).nativeElement.textContent;

    expect(text).toContain(course.description);
  });

  it('emits edit event', () => {
    let actual;

    component.editCourse.subscribe((id) => actual = id);

    const editBtn = element.query(By.css('.edit-btn'));
    editBtn.triggerEventHandler('click', null);

    expect(actual).toEqual(course.id);
  });

  it('emits delete event', () => {
    let actual;

    component.deleteCourse.subscribe((id) => actual = id);

    const editBtn = element.query(By.css('.delete-btn'));
    editBtn.triggerEventHandler('click', null);

    expect(actual).toEqual(course.id);
  });
});
