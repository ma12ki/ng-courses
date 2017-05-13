import { IUser } from '../../shared/user.entity';
import * as auth from './auth.actions';

export interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser;
  token: string;
  error: any;
};

const USER_STORAGE_KEY = 'AUTH_USER';
const TOKEN_STORAGE_KEY = 'AUTH_TOKEN';

const storedUser: IUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

export const initialState: State = {
  loading: false,
  isAuthenticated: !!storedUser,
  user: storedUser,
  token: storedToken,
  error: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_START:
    case auth.LOGOUT_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case auth.LOGIN_SUCCESS: {
      const { user, token } = (action as auth.LoginSuccessAction).payload;

      return {
        ...state,
        user,
        token,
        error: null,
      };
    }
    case auth.LOGIN_ERROR:
    case auth.LOGOUT_ERROR: {
      return {
        ...state,
        error: (action as auth.LoginErrorAction).payload,
      };
    }
    case auth.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
