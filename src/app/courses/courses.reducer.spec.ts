import { Action } from '@ngrx/store';

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
import { initialState, reducer, State } from './courses.reducer';

describe('Courses reducer', () => {
  it('returns initial state if no state passed in', () => {
    const actual = reducer(undefined, {} as Action);

    expect(actual).toEqual(initialState);
  });

  it('returns received state if unknown action passed in', () => {
    const expected = {};
    const actual = reducer(expected as State, { type: 'IDUNNOLOL' } as Action);

    expect(actual).toEqual(expected as State);
  });

  describe('LOAD_START', () => {
    it('sets loading flag to TRUE and stores list params', () => {
      const params: IListParams = {
        itemsPerPage: 1,
        offset: 2,
        searchTerm: '3'
      };
      const action = new LoadStartAction(params);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
      expect(actual.itemsPerPage).toEqual(params.itemsPerPage);
      expect(actual.offset).toEqual(params.offset);
      expect(actual.searchTerm).toEqual(params.searchTerm);
    });
  });

  describe('LOAD_ONE_START / SAVE_START / REMOVE_START', () => {
    it('sets loading to TRUE for LOAD_ONE_START', () => {
      const action = new LoadOneStartAction(1);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
    });

    it('sets loading to TRUE for SAVE_START', () => {
      const action = new SaveStartAction({} as any);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
    });

    it('sets loading to TRUE for REMOVE_START', () => {
      const action = new RemoveStartAction(1);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('sets loading to FALSE and stores items and item count', () => {
      const loadResult = {
        items: [ 1, 2 ],
        totalItems: 10
      };
      const action = new LoadSuccessAction(loadResult as any);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(false);
      expect(actual.items).toEqual(loadResult.items as any);
      expect(actual.totalItems).toEqual(loadResult.totalItems);
    });
  });

  describe('LOAD_ONE_SUCCESS', () => {
    it('sets course to edit', () => {
      const courseToEdit = { lol: 'mao' };
      const action = new LoadOneSuccessAction(courseToEdit as any);

      const actual = reducer(undefined, action);

      expect(actual.courseToEdit).toEqual(courseToEdit);
    });
  });

  describe('SAVE_SUCCESS / REMOVE_SUCCESS', () => {
    it('sets loading to FALSE and error to NULL for SAVE_SUCCESS', () => {
      const action = new SaveSuccessAction({} as any);

      const actual = reducer({} as State, action);

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(null);
    });

    it('sets loading to FALSE and error to NULL for REMOVE_SUCCESS', () => {
      const action = new RemoveSuccessAction();

      const actual = reducer({} as State, action);

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(null);
    });
  });

  describe('LOAD_ERROR / LOAD_ONE_ERROR / REMOVE_ERROR', () => {
    it('sets loading to FALSE and error to error for LOAD_ERROR', () => {
      const error = 'reducer, waht r u doin?';
      const action = new LoadErrorAction(error);

      const actual = reducer({} as State, action);

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(error);
    });

    it('sets loading to FALSE and error to error for LOAD_ONE_ERROR', () => {
      const error = 'reducer!';
      const action = new LoadOneErrorAction(error);

      const actual = reducer({} as State, action);

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(error);
    });

    it('sets loading to FALSE and error to error for REMOVE_ERROR', () => {
      const error = 'plz stahp!';
      const action = new RemoveErrorAction(error);

      const actual = reducer({} as State, action);

      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(error);
    });
  });
});
