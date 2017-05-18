import { State } from './auth.reducer';

import * as authStorage from './auth.storage';

describe('Auth storage', () => {
  describe('#store()', () => {
    it('stores the state', () => {
      const state = {} as State;
      spyOn(localStorage, 'setItem');

      authStorage.store(state);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        authStorage.AUTH_STATE_KEY,
        JSON.stringify(state),
      );
    });
  });

  describe('#retrieve()', () => {
    it('retrieves the state', () => {
      spyOn(localStorage, 'getItem');

      authStorage.retrieve();

      expect(localStorage.getItem).toHaveBeenCalledWith(authStorage.AUTH_STATE_KEY);
    });
  });

  describe('#remove()', () => {
    it('removes the state', () => {
      spyOn(localStorage, 'removeItem');

      authStorage.remove();

      expect(localStorage.removeItem).toHaveBeenCalledWith(authStorage.AUTH_STATE_KEY);
    });
  });
});
