import { LoadOneStartAction, SaveStartAction } from '../courses.actions';
import { coursesSelectors } from '../../app.reducer';
import {
  Component,
  ChangeDetectionStrategy,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AuthorsService } from '../shared/authors.service';
import { Course, ICourse } from '../shared/course.entity';
import { CourseEditComponent, IFormValue } from './course-edit.component';

describe('CourseEditComponent', () => {
  let fixture: ComponentFixture<CourseEditComponent>;
  let component: CourseEditComponent;
  let element: DebugElement;
  let mockRouter;
  let mockRoute;
  let mockAuthorsService;
  let mockStore;
  let course;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockRoute = {
      params: Observable.of({ }),
    };
    mockAuthorsService = {
      fetchAuthors$: jasmine.createSpy('mockAuthorsService.fetchAuthors$')
        .and.returnValue(Observable.of([])),
      authors$: Observable.of([]),
    };
    course = new Course();
    mockStore = {
      dispatch: jasmine.createSpy('mockStore.dispatch'),
      select: jasmine.createSpy('mockStore.select').and.returnValue(Observable.of(course)),
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CourseEditComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: AuthorsService, useValue: mockAuthorsService },
        { provide: Store, useValue: mockStore },
      ]
    })
    // @Inputs and OnPush are not working correctly during tests
    // see https://github.com/angular/angular/issues/12313
    .overrideComponent(CourseEditComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  describe('#ngOnInit()', () => {
    it('assigns the authors$ stream from authrs service to local variable', () => {
      component.ngOnInit();

      expect(component.authors$).toBe(mockAuthorsService.authors$);
    });

    it('fetches course to edit from the store', fakeAsync(() => {
      component.ngOnInit();

      tick();

      expect(mockStore.select).toHaveBeenCalledWith(coursesSelectors.getCourseToEdit);
      expect(component.course).toBe(course);
    }));

    it('calls fetchCourses', () => {
      component.ngOnInit();

      expect(mockAuthorsService.fetchAuthors$).toHaveBeenCalled();
    });

    describe('when courseId is a number', () => {
      const courseId = '31';

      beforeEach(() => {
        const injectedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        injectedRoute.params = Observable.of({ id: courseId });
      });

      it('stores courseId', fakeAsync(() => {
        component.ngOnInit();
        tick();

        expect(component.courseId).toEqual(+courseId);
      }));

      it('sets editMode to TRUE', fakeAsync(() => {
        component.ngOnInit();
        tick();

        expect(component.editMode).toBe(true);
      }));

      it('dispatches load start action', fakeAsync(() => {
        const expected = new LoadOneStartAction(courseId);

        component.ngOnInit();
        tick();

        expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
      }));
    });

    describe('when courseId is a string', () => {
      const courseId = 'new';

      beforeEach(() => {
        const injectedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        injectedRoute.params = Observable.of({ id: courseId });
      });

      it('sets courseId to null', fakeAsync(() => {
        component.ngOnInit();
        tick();

        expect(component.courseId).toEqual(null);
      }));

      it('sets editMode to FALSE', fakeAsync(() => {
        component.ngOnInit();
        tick();

        expect(component.editMode).toBe(false);
      }));

      it('dispatches load start action', fakeAsync(() => {
        const expected = new LoadOneStartAction(courseId);

        component.ngOnInit();
        tick();

        expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
      }));
    });
  });

  describe('#save()', () => {
    it('dispatches save start with form value', () => {
      component.courseId = 123;
      component.course = {
        ...component.course,
        topRated: true,
      };
      const formValue: IFormValue = {
        title: 'learn to use the Force',
        description: 'presented by master Yoda',
        date: new Date(),
        duration: 199,
        authors: [ 6 ],
      };
      const expectedCourse: ICourse = {
        id: component.courseId,
        title: formValue.title,
        description: formValue.description,
        date: formValue.date,
        durationMinutes: formValue.duration,
        topRated: (component.course as any).topRated,
        authors: formValue.authors,
      };
      const expected = new SaveStartAction(expectedCourse);

      component.save(formValue);

      expect(mockStore.dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe('#cancel()', () => {
    it('navigates to main page', () => {
      component.cancel();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
