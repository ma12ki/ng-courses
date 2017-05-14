import { compose } from '@ngrx/core/compose';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as auth from './core/auth/auth.reducer';

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
