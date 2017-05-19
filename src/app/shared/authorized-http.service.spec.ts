import {
  Http,
  Headers,
} from '@angular/http';

import { AuthorizedHttp } from './authorized-http.service';

describe(`AuthorizedHttp`, () => {
  let service: AuthorizedHttp;
  const mockBackend = { some: 'attr' } as any;
  const mockDefaultOptions = { some: 'option'} as any;
  const url = 'the/all/thing';
  let inputOptions;
  const expectedOptions = {
    headers: new Headers({
      Auhtorization: 'Bearer '
    })
  };

  beforeEach(() => {
    service = new AuthorizedHttp(mockBackend, mockDefaultOptions);

    inputOptions = {};
  });

  describe('#request()', () => {
    it('calls parent function with proper params', () => {
      const requestSpy = spyOn(Http.prototype, 'request');

      service.request(url, inputOptions);

      expect(requestSpy).toHaveBeenCalledWith(url, expectedOptions);
    });
  });

  describe('#get()', () => {
    it('calls parent function with proper params', () => {
      const getSpy = spyOn(Http.prototype, 'get');

      service.get(url, inputOptions);

      expect(getSpy).toHaveBeenCalledWith(url, expectedOptions);
    });
  });

  describe('#post()', () => {
    it('calls parent function with proper params', () => {
      const body = 'hot bod';
      const postSpy = spyOn(Http.prototype, 'post');

      service.post(url, body, inputOptions);

      expect(postSpy).toHaveBeenCalledWith(url, body, expectedOptions);
    });
  });

  describe('#put()', () => {
    it('calls parent function with proper params', () => {
      const body = 'hot bod';
      const putSpy = spyOn(Http.prototype, 'put');

      service.put(url, body, inputOptions);

      expect(putSpy).toHaveBeenCalledWith(url, body, expectedOptions);
    });
  });

  describe('#patch()', () => {
    it('calls parent function with proper params', () => {
      const body = 'hot bod';
      const patchSpy = spyOn(Http.prototype, 'patch');

      service.patch(url, body, inputOptions);

      expect(patchSpy).toHaveBeenCalledWith(url, body, expectedOptions);
    });
  });

  describe('#head()', () => {
    it('calls parent function with proper params', () => {
      const headSpy = spyOn(Http.prototype, 'head');

      service.head(url, inputOptions);

      expect(headSpy).toHaveBeenCalledWith(url, expectedOptions);
    });
  });

  describe('#options()', () => {
    it('calls parent function with proper params', () => {
      const optionsSpy = spyOn(Http.prototype, 'options');

      service.options(url, inputOptions);

      expect(optionsSpy).toHaveBeenCalledWith(url, expectedOptions);
    });
  });
});
