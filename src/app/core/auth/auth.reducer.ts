import { IUser } from '../../shared/user.entity';
import * as auth from './auth.actions';

export interface State {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser;
  token: string;
  error: any;
};

export const initialState: State = {
  loading: false,
  isAuthenticated: false,
  user: null,
  token: null,
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
        isAuthenticated: true,
        user,
        token,
        error: null,
      };
    }
    case auth.LOGIN_ERROR:
    case auth.LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
        error: (action as auth.LoginErrorAction).payload,
      };
    }
    case auth.LOGOUT_SUCCESS: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}
