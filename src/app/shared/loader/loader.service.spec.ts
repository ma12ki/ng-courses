import { fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { LoaderService } from './';

describe(`LoaderService`, () => {
  let service: LoaderService;

  beforeEach(() => {
    service = new LoaderService();
  });

  describe('#show()', () => {
    it('updates show$ stream to TRUE', fakeAsync(() => {
      let actual = null;

      service.show();

      service.show$.subscribe((show) => {
        actual = show;
      });

      tick();

      expect(actual).toBe(true);
    }));
  });

  describe('#hide()', () => {
    it('updates show$ stream to FALSE', fakeAsync(() => {
      let actual = null;

      service.hide();

      service.show$.subscribe((show) => {
        actual = show;
      });

      tick();

      expect(actual).toBe(false);
    }));
  });
});
