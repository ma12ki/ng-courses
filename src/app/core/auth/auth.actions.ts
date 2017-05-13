// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { IUserCredentials, IUser } from '../../shared/user.entity';

const ACTION_PREFIX = '[AUTH]';

export const LOGIN_START = `${ACTION_PREFIX}LOGIN_START`;
export const LOGIN_SUCCESS = `${ACTION_PREFIX}LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${ACTION_PREFIX}LOGIN_ERROR`;

export const LOGOUT_START = `${ACTION_PREFIX}LOGOUT_START`;
export const LOGOUT_SUCCESS = `${ACTION_PREFIX}LOGOUT_SUCCESS`;
export const LOGOUT_ERROR = `${ACTION_PREFIX}LOGOUT_ERROR`;

export class LoginStartAction implements Action {
  public readonly type = LOGIN_START;

  constructor(public payload: IUserCredentials) { }
}

export class LoginSuccessAction implements Action {
  public readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: IUser, token: string }) { }
}

export class LoginErrorAction implements Action {
  public readonly type = LOGIN_ERROR;

  constructor(public payload: any) { }
}

export class LogoutStartAction implements Action {
  public readonly type = LOGOUT_START;
}

export class LogoutSuccessAction implements Action {
  public readonly type = LOGOUT_SUCCESS;
}

export class LogoutErrorAction implements Action {
  public readonly type = LOGOUT_ERROR;

  constructor(public payload: any) { }
}

export type Actions
  = LoginStartAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutStartAction
  | LogoutSuccessAction
  | LogoutErrorAction;
