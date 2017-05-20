import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Response,
  ResponseOptions,
  HttpModule,
  ConnectionBackend,
  XHRBackend,
  Headers,
} from '@angular/http';

import { API_URL } from '../../app.constants';
import { AuthorsService } from './authors.service';
import { IAuthor } from './author.entity';

describe(`AuthorsService`, () => {
  const apiUrl = 'wow/such/api/';
  let backend: MockBackend;
  let service: AuthorsService;

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
        AuthorsService,
      ]
    });
  });

  beforeEach(inject([XHRBackend, AuthorsService],
    (mockBackend: MockBackend, coursesService: AuthorsService) => {
      backend = mockBackend;
      service = coursesService;
    })
  );

  describe('#fetchAuthors$()', () => {
    it('calls the appropriate endpoint and updates the authors$ stream', fakeAsync(() => {
      const expected: IAuthor[] = [{
        id: 1,
        name: 'king',
      }];

      backend.connections.subscribe((connection: MockConnection) => {
        const { url } = connection.request;
        expect(url).toEqual(`${apiUrl}authors`);

        connection.mockRespond(new Response(
          new ResponseOptions({
            body: expected,
          })
        ));
      });

      let actual = null;

      service.fetchAuthors$().subscribe((res) => null);
      service.authors$.subscribe((res) => actual = res);

      tick();

      expect(actual).toEqual(expected);
    }));
  });
});
