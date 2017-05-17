import { async } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { AuthGuardService } from './auth-guard.service';

describe(`AuthGuardService`, () => {
  let service: AuthGuardService;
  let mockRouter;
  let mockStore;
  let isAuthenticated: BehaviorSubject<boolean>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('mockRouter.navigate'),
    };

    isAuthenticated = new BehaviorSubject<boolean>(false);

    mockStore = createMockStore(isAuthenticated);
  });

  beforeEach(() => {
    service = new AuthGuardService(mockRouter, mockStore);
  });

  describe('#canActivate()', () => {
    describe('when authenticated', () => {
      beforeEach(async(() => {
        isAuthenticated.next(true);
      }));

      it('returns TRUE', () => {
        const actual = service.canActivate();

        expect(mockRouter.navigate).not.toHaveBeenCalled();
        expect(actual).toEqual(true);
      });
    });

    describe('when NOT authenticated', () => {
      beforeEach(async(() => {
        isAuthenticated.next(false);
      }));

      it('returns FALSE and redirects to login', () => {
        const actual = service.canActivate();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        expect(actual).toEqual(false);
      });
    });
  });

  afterEach(() => {
    isAuthenticated.complete();
  });

  function createMockStore(observable: Observable<boolean>) {
    return {
      select: jasmine.createSpy('mockStore.select').and.returnValue(observable),
    };
  }

});
