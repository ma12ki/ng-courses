import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(CourseListComponent);
  });

  describe('when there are NO courses', () => {
    beforeEach(() => {
      fixture.componentInstance.courses = [];

      fixture.detectChanges();
    });

    it('shows no courses message', () => {
      const noCoursesEl = fixture.debugElement.query(By.css('.no-courses'));

      expect(noCoursesEl).toBeTruthy();
    });
  });

  describe('when there are courses to show', () => {
    beforeEach(() => {
      fixture.componentInstance.courses = [{}] as any;

      fixture.detectChanges();
    });

    it('does NOT show no courses message', () => {
      const noCoursesEl = fixture.debugElement.query(By.css('.no-courses'));

      expect(noCoursesEl).toBeFalsy();
    });
  });

  describe('#reemitDeleteCourse()', () => {
    it('emits deleteCourse event', () => {
      const expected = 6;
      let actual;
      fixture.componentInstance.deleteCourse.subscribe((id) => actual = id);

      fixture.componentInstance.reemitDeleteCourse(expected);

      expect(actual).toEqual(expected);
    });
  });

  describe('#reemitEditCourse()', () => {
    it('emits editCourse event', () => {
      const expected = 6;
      let actual;
      fixture.componentInstance.editCourse.subscribe((id) => actual = id);

      fixture.componentInstance.reemitEditCourse(expected);

      expect(actual).toEqual(expected);
    });
  });
});
