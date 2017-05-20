import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  RequestMethod,
  Response,
  ResponseOptions,
  HttpModule,
  ConnectionBackend,
  XHRBackend,
  Headers,
} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { API_URL } from '../../app.constants';
import { CoursesService } from './courses.service';
import { IListParams, IListResult } from '../courses.actions';
import { ICourse } from './course.entity';
import { ICourseDto } from './course-dto.entity';

describe(`CoursesService`, () => {
  const apiUrl = 'wow/such/api/';
  let backend: MockBackend;
  let service: CoursesService;

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
        CoursesService,
      ]
    });
  });

  beforeEach(inject([XHRBackend, CoursesService],
    (mockBackend: MockBackend, coursesService: CoursesService) => {
      backend = mockBackend;
      service = coursesService;
    })
  );

  describe('#getCourseById$()', () => {
    const courseId = 666;

    it('returns token and user data', fakeAsync(() => {
      const id = 1;
      const title = 'title';
      const date = new Date();
      const durationMinutes = 100;
      const description = 'description';
      const topRated = true;
      const authors = [ 1, 2 ];
      const courseDto: ICourseDto = {
        id,
        title,
        date: date.toISOString(),
        durationSeconds: durationMinutes * 60,
        description,
        topRated,
        authors,
      };
      const expected: ICourse = {
        id,
        title,
        date,
        durationMinutes,
        description,
        topRated,
        authors,
      };

      backend.connections.subscribe((connection: MockConnection) => {
        const { url } = connection.request;
        expect(url).toEqual(`${apiUrl}courses/${courseId}`);

        connection.mockRespond(new Response(
          new ResponseOptions({
            body: courseDto,
          })
        ));
      });

      let actual = null;

      service.getCourseById$(courseId).subscribe((course) => {
        actual = course;
      });

      tick();

      expect(actual).toEqual(expected);
    }));
  });

  describe('#fetchCourses$()', () => {
    it('calls endpoint with correct params and returns items and total count', fakeAsync(() => {
      const params: IListParams = {
        itemsPerPage: 1,
        offset: 2,
        searchTerm: 'purpose',
      };
      const totalItems = 10;
      const courses: ICourse[] = [{
        id: 1,
        title: 'title',
        date: new Date(),
        durationMinutes: 100,
        description: 'description',
        topRated: true,
        authors: [ 1, 2 ],
      }];
      const coursesDto: ICourseDto[] = [{
        id: courses[0].id,
        title: courses[0].title,
        date: courses[0].date.toISOString(),
        durationSeconds: courses[0].durationMinutes * 60,
        description: courses[0].description,
        topRated: courses[0].topRated,
        authors: courses[0].authors,
      }];
      const expected: IListResult = {
        items: courses,
        totalItems,
      };

      backend.connections.subscribe((connection: MockConnection) => {
        const { url } = connection.request;
        expect(url).toMatch(`${apiUrl}courses`);
        expect(url).toMatch(`_start=${params.offset}`);
        expect(url).toMatch(`_limit=${params.itemsPerPage}`);
        expect(url).toMatch(`title_like=${params.searchTerm}`);

        connection.mockRespond(new Response(
          new ResponseOptions({
            body: coursesDto,
            headers: new Headers({
              'x-total-count': totalItems,
            })
          })
        ));
      });

      let actual = null;

      service.fetchCourses$(params).subscribe((itemsAndCount) => {
        actual = itemsAndCount;
      });

      tick();

      expect(actual).toEqual(expected);
    }));
  });

  describe('#saveCourse()', () => {
    describe('create', () => {
      it('calls appropriate endpoint with mapped course', fakeAsync(() => {
        const course: ICourse = {
          id: null,
          title: 'title',
          date: new Date(),
          durationMinutes: 100,
          description: 'description',
          topRated: true,
          authors: [ 1, 2 ],
        };
        const expected: ICourseDto = {
          id: course.id,
          title: course.title,
          date: course.date.toISOString(),
          durationSeconds: course.durationMinutes * 60,
          description: course.description,
          topRated: course.topRated,
          authors: course.authors,
        };
        let actual = null;

        backend.connections.subscribe((connection: MockConnection) => {
          const { url, method } = connection.request;
          actual = connection.request.json();

          expect(url).toMatch(`${apiUrl}courses`);
          expect(method).toEqual(RequestMethod.Post);

          connection.mockRespond(new Response(
            new ResponseOptions({})
          ));
        });

        service.saveCourse(course).subscribe((res) => null);

        tick();

        expect(actual).toEqual(expected);
      }));
    });

    describe('edit', () => {
      it('calls appropriate endpoint with mapped course', fakeAsync(() => {
        const course: ICourse = {
          id: 1,
          title: 'title',
          date: new Date(),
          durationMinutes: 100,
          description: 'description',
          topRated: true,
          authors: [ 1, 2 ],
        };
        const expected: ICourseDto = {
          id: course.id,
          title: course.title,
          date: course.date.toISOString(),
          durationSeconds: course.durationMinutes * 60,
          description: course.description,
          topRated: course.topRated,
          authors: course.authors,
        };
        let actual = null;

        backend.connections.subscribe((connection: MockConnection) => {
          const { url, method } = connection.request;
          actual = connection.request.json();

          expect(url).toMatch(`${apiUrl}courses/${course.id}`);
          expect(method).toEqual(RequestMethod.Put);

          connection.mockRespond(new Response(
            new ResponseOptions({})
          ));
        });

        service.saveCourse(course).subscribe((res) => null);

        tick();

        expect(actual).toEqual(expected);
      }));
    });
  });

  describe('#deleteCourse$()', () => {
    it('calls appropriate endpoint', fakeAsync(() => {
      const courseId = 6;

      backend.connections.subscribe((connection: MockConnection) => {
        const { url, method } = connection.request;

        expect(url).toMatch(`${apiUrl}courses/${courseId}`);
        expect(method).toEqual(RequestMethod.Delete);

        connection.mockRespond(new Response(
          new ResponseOptions({})
        ));
      });

      service.deleteCourse$(courseId).subscribe((res) => null);

      tick();
    }));
  });
});
