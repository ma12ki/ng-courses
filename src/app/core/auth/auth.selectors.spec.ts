import { IUser } from '../../shared/user.entity';
import { State, initialState } from './auth.reducer';
import * as selectors from './auth.selectors';

describe('Auth selectors', () => {
  it('gets user from state', () => {
    const expected = {} as IUser;
    const state: State = {
      ...initialState,
      user: expected,
    };

    const actual = selectors.getUser(state);

    expect(actual).toEqual(expected);
  });

  it('gets token from state', () => {
    const expected = 'Token';
    const state: State = {
      ...initialState,
      token: expected,
    };

    const actual = selectors.getToken(state);

    expect(actual).toEqual(expected);
  });

  it('gets error from state', () => {
    const expected = 'AIIIEEEEEEEEEEE!!!!11one';
    const state: State = {
      ...initialState,
      error: expected,
    };

    const actual = selectors.getError(state);

    expect(actual).toEqual(expected);
  });

  it('gets loading from state', () => {
    const expected = true;
    const state: State = {
      ...initialState,
      loading: expected,
    };

    const actual = selectors.isLoading(state);

    expect(actual).toEqual(expected);
  });

  it('gets isAuthenticated from state', () => {
    const expected = true;
    const state: State = {
      ...initialState,
      isAuthenticated: expected,
    };

    const actual = selectors.isAuthenticated(state);

    expect(actual).toEqual(expected);
  });
});
