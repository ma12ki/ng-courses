import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import * as auth from './auth.actions';
import { remove as removeAuthStorage } from './auth.storage';
import { IUserAndToken, IUserCredentials } from '../../shared/user.entity';
import { LoaderService } from '../../shared/loader';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
  public login$ = this.actions$
    .ofType(auth.LOGIN_START)
    .map(toPayload)
    .do(() => this.loaderService.show())
    .switchMap((credentials: IUserCredentials) => this.authService.login(credentials))
      .map((res: IUserAndToken) => new auth.LoginSuccessAction(res))
      .do(() => this.router.navigateByUrl(''))
      .catch((err) => Observable.of(new auth.LoginErrorAction(err))
    )
    .do(() => this.loaderService.hide());

  // tslint:disable-next-line:member-ordering
  @Effect()
  public logout$ = this.actions$
    .ofType(auth.LOGOUT_START)
    .do(() => this.loaderService.show())
    .do(() => removeAuthStorage())
    .map(() => new auth.LogoutSuccessAction())
    .do(() => {
      this.router.navigateByUrl('/login');
    })
    .catch((err) => Observable.of(new auth.LogoutErrorAction(err)))
    .do(() => this.loaderService.hide());
}
