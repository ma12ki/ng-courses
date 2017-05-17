import { Action } from '@ngrx/store';

import { IUser, IUserCredentials } from '../../shared/user.entity';
import {
    LoginErrorAction,
    LoginStartAction,
    LoginSuccessAction,
    LogoutErrorAction,
    LogoutStartAction,
    LogoutSuccessAction,
} from './auth.actions';
import { initialState, reducer, State } from './auth.reducer';

describe('Auth reducer', () => {
  it('returns initial state if no state passed in', () => {
    const actual = reducer(undefined, {} as Action);

    expect(actual).toEqual(initialState);
  });

  it('returns received state if unknown action passed in', () => {
    const expected = {};
    const actual = reducer(expected as State, { type: 'IDUNNOLOL' } as Action);

    expect(actual).toEqual(expected as State);
  });

  describe('LOGIN_START / LOGOUT_START', () => {
    it('sets loading flag to TRUE for LOGIN_START', () => {
      const action = new LoginStartAction({} as IUserCredentials);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
    });

    it('sets loading flag to TRUE for LOGOUT_START', () => {
      const action = new LogoutStartAction();

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(true);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('sets login success data', () => {
      const userInfo = {
        user: {} as IUser,
        token: 'wow such token!',
      };
      const action = new LoginSuccessAction(userInfo);

      const actual = reducer(undefined, action);

      expect(actual.isAuthenticated).toBe(true);
      expect(actual.user).toEqual(userInfo.user);
      expect(actual.token).toEqual(userInfo.token);
    });
  });

  describe('LOGIN_ERROR / LOGOUT_ERROR', () => {
    it('sets loading flag to FALSE and stores error for LOGIN_ERROR', () => {
      const error = new Error('whyyyyyyyy? ;(');
      const action = new LoginErrorAction(error);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(false);
      expect(actual.error).toEqual(error);
    });

    it('sets loading flag to FALSE and stores error for LOGOUT_ERROR', () => {
      const error = new Error('not kwlz');
      const action = new LogoutErrorAction(error);

      const actual = reducer(undefined, action);

      expect(actual.loading).toBe(false);
      expect(actual.error).toEqual(error);
    });
  });

  describe('LOGOUT_SUCCESS', () => {
    it('resets state to initial values', () => {
      const action = new LogoutSuccessAction();

      const actual = reducer({} as State, action);

      expect(actual).toEqual(initialState);
    });
  });
});
