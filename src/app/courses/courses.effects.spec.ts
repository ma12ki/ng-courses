import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Rx';

import {
    IListParams,
    LoadErrorAction,
    LoadOneErrorAction,
    LoadOneStartAction,
    LoadOneSuccessAction,
    LoadStartAction,
    LoadSuccessAction,
    RemoveErrorAction,
    RemoveStartAction,
    RemoveSuccessAction,
    SaveErrorAction,
    SaveStartAction,
    SaveSuccessAction
} from './courses.actions';
import { LoaderService } from '../shared/loader';
import { CoursesService } from './shared/courses.service';
import { CoursesEffects } from './courses.effects';

describe('CoursesEffects', () => {
  let mockCoursesService;
  let mockLoaderService;
  let mockRouter;

  let runner: EffectsRunner;
  let coursesEffects: CoursesEffects;

  beforeEach(() => {
    mockCoursesService = jasmine.createSpyObj('mockCoursesService', [
      'fetchCourses$',
      'deleteCourse$',
      'getCourseById$',
      'saveCourse',
    ]);
    mockLoaderService = jasmine.createSpyObj('mockLoaderService', ['show', 'hide']);
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigateByUrl']);
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CoursesEffects,
      {
        provide: CoursesService,
        useValue: mockCoursesService,
      },
      {
        provide: LoaderService,
        useValue: mockLoaderService,
      },
      {
        provide: Router,
        useValue: mockRouter,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    coursesEffects = TestBed.get(CoursesEffects);
  });

  describe('load$', () => {
    const coursesParams: IListParams = {
      itemsPerPage: 6,
      offset: 6,
      searchTerm: '6',
    };
    const loadStartAction = new LoadStartAction(coursesParams);

    describe('when load succeeds', () => {
      const loadResult = {
        items: [],
        totalItems: 0,
      };

      beforeEach(() => {
        mockCoursesService.fetchCourses$.and.returnValue(Observable.of(loadResult));
      });

      it('calls fetch courses with params from payload', (done) => {
        const expected = coursesParams;

        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(mockCoursesService.fetchCourses$).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits load success action', (done) => {
        const expected = new LoadSuccessAction(loadResult);

        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

    describe('when login fails', () => {
      const loadError = 'oh noez!';

      beforeEach(() => {
        mockCoursesService.fetchCourses$.and.returnValue(Observable.throw(loadError));
      });

      it('calls fetch courses with params from payload', (done) => {
        const expected = coursesParams;

        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(mockCoursesService.fetchCourses$).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits load error action', (done) => {
        const expected = new LoadErrorAction(loadError);

        runner.queue(loadStartAction);

        coursesEffects.load$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });
  });

  describe('remove$', () => {
    const courseId = 69;
    const removeStartAction = new RemoveStartAction(courseId);

    describe('when remove succeeds', () => {
      beforeEach(() => {
        mockCoursesService.deleteCourse$.and.returnValue(Observable.of(''));
      });

      it('calls delete course with param from payload', (done) => {
        const expected = courseId;

        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(mockCoursesService.deleteCourse$).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits remove success action', (done) => {
        const expected = new RemoveSuccessAction();

        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

    describe('when remove fails', () => {
      const removeError = 'oh noez!';

      beforeEach(() => {
        mockCoursesService.deleteCourse$.and.returnValue(Observable.throw(removeError));
      });

      it('calls remove course with param from payload', (done) => {
        const expected = courseId;

        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(mockCoursesService.deleteCourse$).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits remove error action', (done) => {
        const expected = new RemoveErrorAction(removeError);

        runner.queue(removeStartAction);

        coursesEffects.remove$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });
  });

  describe('afterRemove$', () => {
    it('emits load start action after remove success', (done) => {
      const expected = new LoadStartAction({ offset: 0 });

      runner.queue(new RemoveSuccessAction());

      coursesEffects.afterRemove$.subscribe((result) => {
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('save$', () => {
    const course = { id: 666 } as any;
    const saveStartAction = new SaveStartAction(course);

    describe('when save succeeds', () => {
      const response = { such: 'response' } as any;

      beforeEach(() => {
        mockCoursesService.saveCourse.and.returnValue(Observable.of(response));
      });

      it('calls save course with course from payload', (done) => {
        const expected = course;

        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(mockCoursesService.saveCourse).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits save success action', (done) => {
        const expected = new SaveSuccessAction(response);

        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

    describe('when save fails', () => {
      const saveError = 'oh noez!';

      beforeEach(() => {
        mockCoursesService.saveCourse.and.returnValue(Observable.throw(saveError));
      });

      it('calls save course with course from payload', (done) => {
        const expected = course;

        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(mockCoursesService.saveCourse).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits save error action', (done) => {
        const expected = new SaveErrorAction(saveError);

        runner.queue(saveStartAction);

        coursesEffects.save$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });
  });

  describe('afterSave$', () => {
    it('emits load start action after save success', (done) => {
      const expected = new LoadStartAction({});

      runner.queue(new SaveSuccessAction({} as any));

      coursesEffects.afterSave$.subscribe((result) => {
        expect(result).toEqual(expected);
        done();
      });
    });
  });

  describe('loadOne$', () => {
    const courseId = 666;
    const newCourse = 'new';

    describe('when course id is a number', () => {
      const loadOneStartAction = new LoadOneStartAction(courseId);

      describe('when load one succeeds', () => {
        const response = { such: 'response' } as any;

        beforeEach(() => {
          mockCoursesService.getCourseById$.and.returnValue(Observable.of(response));
        });

        it('calls get course with id from payload', (done) => {
          const expected = courseId;

          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(mockCoursesService.getCourseById$).toHaveBeenCalledWith(expected);
            done();
          });
        });

        it('shows and hides loader', (done) => {
          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(mockLoaderService.show).toHaveBeenCalled();
            expect(mockLoaderService.hide).toHaveBeenCalled();
            done();
          });
        });

        it('emits load one success action', (done) => {
          const expected = new LoadOneSuccessAction(response);

          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(result).toEqual(expected);
            done();
          });
        });
      });

      describe('when save fails', () => {
        const saveError = 'oh noez!';

        beforeEach(() => {
          mockCoursesService.getCourseById$.and.returnValue(Observable.throw(saveError));
        });

        it('calls get course with id from payload', (done) => {
          const expected = courseId;

          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(mockCoursesService.getCourseById$).toHaveBeenCalledWith(expected);
            done();
          });
        });

        it('shows and hides loader', (done) => {
          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(mockLoaderService.show).toHaveBeenCalled();
            expect(mockLoaderService.hide).toHaveBeenCalled();
            done();
          });
        });

        it('emits laod one error action', (done) => {
          const expected = new LoadOneErrorAction(saveError);

          runner.queue(loadOneStartAction);

          coursesEffects.loadOne$.subscribe((result) => {
            expect(result).toEqual(expected);
            done();
          });
        });
      });
    });

    describe('when course id is a string', () => {
      const loadOneStartAction = new LoadOneStartAction(newCourse);

      it('does NOT call get course', (done) => {
        runner.queue(loadOneStartAction);

        coursesEffects.loadOne$.subscribe((result) => {
          expect(mockCoursesService.getCourseById$).not.toHaveBeenCalled();
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(loadOneStartAction);

        coursesEffects.loadOne$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('emits load one success action with empty object', (done) => {
        const expected = new LoadOneSuccessAction({} as any);

        runner.queue(loadOneStartAction);

        coursesEffects.loadOne$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });
  });
});
