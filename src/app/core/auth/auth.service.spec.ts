import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Response,
  ResponseOptions,
  HttpModule,
  ConnectionBackend,
  XHRBackend,
} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { API_URL } from '../../app.constants';
import { AuthService } from './auth.service';

describe(`AuthService`, () => {
  const apiUrl = 'wow/such/api/';
  let backend: MockBackend;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend,
        },
        {
          provide: API_URL,
          useValue: apiUrl,
        },
        AuthService,
      ]
    });
  });

  beforeEach(inject([XHRBackend, AuthService],
    (mockBackend: MockBackend, authService: AuthService) => {
      backend = mockBackend;
      service = authService;
    })
  );

  describe('#login()', () => {
    // contains { id: 666 }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjY2fQ.x';
    const userId = 666;
    const user = { login: 'Leeloo' };

    it('returns token and user data', fakeAsync(() => {
      backend.connections.subscribe((connection: MockConnection) => {
        const { url } = connection.request;
        switch (url) {
          case `${apiUrl}login`:
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: { token },
              })
            ));
            break;
          case `${apiUrl}users/${userId}`:
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: user,
              })
            ));
            break;
          default:
            throw new Error(`unrecognized url: ${url}`);
        }
      });

      const expected = {
        token,
        user,
      };

      let actual = null;

      service.login({
        login: 'Leeloo',
        password: 'multipass',
      }).subscribe((res) => {
        actual = res;
      });

      tick();

      expect(actual).toEqual(expected);
    }));
  });
});
