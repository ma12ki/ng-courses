// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { ICourse } from './shared/course.entity';

const ACTION_PREFIX = '[COURSES]';

export const LOAD_START = `${ACTION_PREFIX}LOAD_START`;
export const LOAD_SUCCESS = `${ACTION_PREFIX}LOAD_SUCCESS`;
export const LOAD_ERROR = `${ACTION_PREFIX}LOAD_ERROR`;

export const SAVE_START = `${ACTION_PREFIX}SAVE_START`;
export const SAVE_SUCCESS = `${ACTION_PREFIX}SAVE_SUCCESS`;
export const SAVE_ERROR = `${ACTION_PREFIX}SAVE_ERROR`;

export const REMOVE_START = `${ACTION_PREFIX}REMOVE_START`;
export const REMOVE_SUCCESS = `${ACTION_PREFIX}REMOVE_SUCCESS`;
export const REMOVE_ERROR = `${ACTION_PREFIX}REMOVE_ERROR`;

export const LOAD_ONE_START = `${ACTION_PREFIX}LOAD_ONE_START`;
export const LOAD_ONE_SUCCESS = `${ACTION_PREFIX}LOAD_ONE_SUCCESS`;
export const LOAD_ONE_ERROR = `${ACTION_PREFIX}LOAD_ONE_ERROR`;

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

export class SaveStartAction implements Action {
  public readonly type = SAVE_START;

  constructor(public payload: ICourse) { }
}
export class SaveSuccessAction implements Action {
  public readonly type = SAVE_SUCCESS;

  constructor(public payload: ICourse) { }
}
export class SaveErrorAction implements Action {
  public readonly type = SAVE_ERROR;

  constructor(public payload: any) { }
}

export class LoadOneStartAction implements Action {
  public readonly type = LOAD_ONE_START;

  constructor(public payload: number | string) { }
}
export class LoadOneSuccessAction implements Action {
  public readonly type = LOAD_ONE_SUCCESS;

  constructor(public payload: ICourse) { }
}
export class LoadOneErrorAction implements Action {
  public readonly type = LOAD_ONE_ERROR;

  constructor(public payload: any) { }
}

export type Actions
  = LoadStartAction
  | LoadSuccessAction
  | LoadErrorAction
  | RemoveStartAction
  | RemoveSuccessAction
  | RemoveErrorAction
  | SaveStartAction
  | SaveSuccessAction
  | SaveErrorAction
  | LoadOneStartAction
  | LoadOneSuccessAction
  | LoadOneErrorAction;
