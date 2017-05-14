// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { ICourse } from './shared/course.entity';
// import { IUserCredentials, IUser } from '../../shared/user.entity';

const ACTION_PREFIX = '[COURSES]';

export const LOAD_START = `${ACTION_PREFIX}LOAD_START`;
export const LOAD_SUCCESS = `${ACTION_PREFIX}LOAD_SUCCESS`;
export const LOAD_ERROR = `${ACTION_PREFIX}LOAD_ERROR`;

export const ADD_START = `${ACTION_PREFIX}ADD_START`;
export const ADD_SUCCESS = `${ACTION_PREFIX}ADD_SUCCESS`;
export const ADD_ERROR = `${ACTION_PREFIX}ADD_ERROR`;

export const EDIT_START = `${ACTION_PREFIX}EDIT_START`;
export const EDIT_SUCCESS = `${ACTION_PREFIX}EDIT_SUCCESS`;
export const EDIT_ERROR = `${ACTION_PREFIX}EDIT_ERROR`;

export const REMOVE_START = `${ACTION_PREFIX}REMOVE_START`;
export const REMOVE_SUCCESS = `${ACTION_PREFIX}REMOVE_SUCCESS`;
export const REMOVE_ERROR = `${ACTION_PREFIX}REMOVE_ERROR`;

export interface IListParams {
  itemsPerPage?: number;
  offset?: number;
  searchTerm?: string;
}

export interface IListResult {
  items: ICourse[];
  totalItems: number;
}

export class LoadStartAction implements Action {
  public readonly type = LOAD_START;

  constructor(public payload: IListParams) {
    payload.itemsPerPage = payload.itemsPerPage || 5;
    payload.offset = payload.offset || 0;
    payload.searchTerm = payload.searchTerm || '';
  }
}

export class LoadSuccessAction implements Action {
  public readonly type = LOAD_SUCCESS;

  constructor(public payload: { items: ICourse[], totalItems: number }) { }
}

export class LoadErrorAction implements Action {
  public readonly type = LOAD_ERROR;

  constructor(public payload: any) { }
}

export class RemoveStartAction implements Action {
  public readonly type = REMOVE_START;

  constructor(public payload: number) { }
}

export class RemoveSuccessAction implements Action {
  public readonly type = REMOVE_SUCCESS;
}

export class RemoveErrorAction implements Action {
  public readonly type = REMOVE_ERROR;

  constructor(public payload: any) { }
}

// export class LogoutStartAction implements Action {
//   public readonly type = LOGOUT_START;
// }

// export class LogoutSuccessAction implements Action {
//   public readonly type = LOGOUT_SUCCESS;
// }

// export class LogoutErrorAction implements Action {
//   public readonly type = LOGOUT_ERROR;

//   constructor(public payload: any) { }
// }

export type Actions
  = LoadStartAction
  | LoadSuccessAction
  | LoadErrorAction
  | RemoveStartAction
  | RemoveSuccessAction
  | RemoveErrorAction;
