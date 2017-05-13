import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import * as auth from './auth.actions';
import { IUserAndToken, IUserCredentials } from '../../shared/user.entity';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
  public login$ = this.actions$
    .ofType(auth.LOGIN_START)
    .map(toPayload)
    .switchMap((credentials: IUserCredentials) => this.authService.reduxLogin(credentials))
      .map((res: IUserAndToken) => new auth.LoginSuccessAction(res))
      .catch((err) => Observable.of(new auth.LoginErrorAction(err))
    );
}
