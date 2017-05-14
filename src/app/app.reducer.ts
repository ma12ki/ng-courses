import { compose } from '@ngrx/core/compose';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as auth from './core/auth/auth.reducer';
import * as authSelector from './core/auth/auth.selectors';

export interface State {
  auth: auth.State;
}

const reducers = {
  auth: auth.reducer,
};

const rootReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return rootReducer(state, action);
}

const getAuthState = (state: State): auth.State => state.auth;

export const authSelectors = {
  getUser(state: State) {
    return compose(authSelector.getUser, getAuthState)(state);
  },
  isAuthenticated(state: State) {
    return compose(authSelector.isAuthenticated, getAuthState)(state);
  },
};
