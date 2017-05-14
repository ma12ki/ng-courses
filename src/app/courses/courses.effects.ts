import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as courses from './courses.actions';
import { IListParams, IListResult } from './courses.actions';
import { CoursesService } from './shared/courses.service';
import { LoaderService } from '../shared/loader';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
  public load$ = this.actions$
    .ofType(courses.LOAD_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((params: IListParams) => this.coursesService.reduxFetchCourses$(params))
      .map((res: IListResult) => new courses.LoadSuccessAction(res))
      .catch((err) => Observable.of(new courses.LoadErrorAction(err))
    )
    .do(() => this.loaderService.hide());
}
