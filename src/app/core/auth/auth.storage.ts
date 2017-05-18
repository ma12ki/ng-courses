import { State } from './auth.reducer';

export const AUTH_STATE_KEY = 'AUTH_STATE';

export const store = (state: State): void => {
  try {
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

export const retrieve = (): State => {
  try {
    const serialized = localStorage.getItem(AUTH_STATE_KEY);
    if (serialized != null) {
      return JSON.parse(serialized);
    }
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const remove = (): void => {
  try {
    localStorage.removeItem(AUTH_STATE_KEY);
  } catch (e) {
    console.log(e);
  }
};
