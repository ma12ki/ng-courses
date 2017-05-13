import { State } from './auth.reducer';

export const getUser = (state: State) => state.user;

export const getToken = (state: State) => state.token;

export const getError = (state: State) => state.error;

export const isLoading = (state: State) => state.loading;

export const isAuthenticated = (state: State) => state.isAuthenticated;
