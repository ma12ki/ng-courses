import { compose } from '@ngrx/core/compose';
import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as auth from './core/auth/auth.reducer';
import * as authSelector from './core/auth/auth.selectors';

import * as courses from './courses/courses.reducer';
import * as coursesSelector from './courses/courses.selectors';

export interface State {
  auth: auth.State;
  courses: courses.State;
}

const reducers = {
  auth: auth.reducer,
  courses: courses.reducer,
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

const getCoursesState = (state: State): courses.State => state.courses;

export const coursesSelectors = {
  getItems(state: State) {
    return compose(coursesSelector.getItems, getCoursesState)(state);
  },
  getTotalItems(state: State) {
    return compose(coursesSelector.getTotalItems, getCoursesState)(state);
  },
  getItemsPerPage(state: State) {
    return compose(coursesSelector.getItemsPerPage, getCoursesState)(state);
  },
  getOffset(state: State) {
    return compose(coursesSelector.getOffset, getCoursesState)(state);
  },
  getSearchTerm(state: State) {
    return compose(coursesSelector.getSearchTerm, getCoursesState)(state);
  },
};
