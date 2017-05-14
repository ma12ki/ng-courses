import { State } from './auth.reducer';

const AUTH_STORE_KEY = 'AUTH_STORE';

export const store = (authState: State): void => {
  try {
    localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(authState));
  } catch (e) {
    console.log(e);
  }
};

export const retrieve = (): State => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORE_KEY));
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const remove = (): void => {
  try {
    localStorage.removeItem(AUTH_STORE_KEY);
  } catch (e) {
    console.log(e);
  }
};
