import { ICourse } from './shared/course.entity';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as courses from './courses.actions';
import { IListParams, IListResult } from './courses.actions';
import { CoursesService } from './shared/courses.service';
import { LoaderService } from '../shared/loader';

// tslint:disable:member-ordering
@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  @Effect()
  public load$ = this.actions$
    .ofType(courses.LOAD_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((params: IListParams) => this.coursesService.fetchCourses$(params))
      .map((res: IListResult) => new courses.LoadSuccessAction(res))
      .catch((err) => Observable.of(new courses.LoadErrorAction(err))
    )
    .do(() => this.loaderService.hide());

  @Effect()
  public remove$ = this.actions$
    .ofType(courses.REMOVE_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((courseId: number) => this.coursesService.deleteCourse$(courseId))
      .map(() => new courses.RemoveSuccessAction())
      .catch((err) => Observable.of(new courses.RemoveErrorAction(err))
    )
    .do(() => this.loaderService.hide());

  @Effect()
  public afterRemove$ = this.actions$
    .ofType(courses.REMOVE_SUCCESS)
    .map(() => new courses.LoadStartAction({ offset: 0 }));

  @Effect()
  public save$ = this.actions$
    .ofType(courses.SAVE_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((course: ICourse) => this.coursesService.saveCourse(course))
      .map((res: ICourse) => new courses.SaveSuccessAction(res))
      .catch((err) => Observable.of(new courses.SaveErrorAction(err))
    )
    .do(() => this.loaderService.hide());

  @Effect()
  public afterSave$ = this.actions$
    .ofType(courses.SAVE_SUCCESS)
    .do(() => this.router.navigateByUrl(''))
    .map(() => new courses.LoadStartAction({}));

  @Effect()
  public loadOne$ = this.actions$
    .ofType(courses.LOAD_ONE_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((courseId: number | string) => {
        if (courseId != null && !isNaN(+courseId)) {
          return this.coursesService.getCourseById$(+courseId);
        }
        return Observable.of({});
      })
      .map((res: ICourse) => new courses.LoadOneSuccessAction(res))
      .catch((err) => Observable.of(new courses.LoadOneErrorAction(err))
    )
    .do(() => this.loaderService.hide());
}
