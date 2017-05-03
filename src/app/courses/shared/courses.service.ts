import { Injectable, Inject } from '@angular/core';
import { ResponseContentType, RequestOptionsArgs, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs';
import * as moment from 'moment';
import * as faker from 'Faker';

import { API_URL } from './../../app.constants';
import { ICourseDto, CourseDto } from './course-dto.entity';
import { ICourse, Course } from './course.entity';
import { AuthorizedHttp } from './../../core/authorized-http.service';

interface ICourseOperation extends Function {
  (courses: ICourse[]): ICourse[];
}

@Injectable()
export class CoursesService {
  private _courses$: Observable<ICourse[]>;
  private _updates$: BehaviorSubject<any> = new BehaviorSubject<any>((i) => i);
  private _totalCourses$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _coursesEndpoint: string = 'courses';

  constructor(
    @Inject(API_URL) private API_URL: string,
    private http: Http,
  ) {
    this._courses$ = this._updates$
      .scan((courses: ICourse[], operation: ICourseOperation) => {
        return operation(courses);
      }, [])
      .publishReplay(1)
      .refCount();
  }

  public get courses$(): Observable<ICourse[]> {
    return this._courses$;
  }

  public get totalCourses$(): Observable<number> {
    return this._totalCourses$;
  }

  public getCourseById$(id: number): Observable<ICourse> {
    return this.http.get(`${this.API_URL + this._coursesEndpoint}/${id}`)
      .map((response) => response.json())
      .map(this.mapDtoToModel);
  }

  public fetchCourses$(
    start: number = 0,
    limit: number = 5,
    searchTerm: string = ''
  ): Observable<any> {
    const options: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      params: {
        _start: start,
        _limit: limit,
        title_like: searchTerm,
      },
    };
    return this.http.get(this.API_URL + this._coursesEndpoint, options)
      .do((response) => {
        const totalCourses = +response.headers.get('x-total-count');
        this._totalCourses$.next(totalCourses);
      })
      .map((response) => response.json())
      .map((courseDtos: ICourseDto[]) => this.mapDtosToModel(courseDtos))
      .do((courses: ICourse[]) => {
        this._updates$.next((_) => courses);
      });
  }

  public addCourse(course): void {
    this._updates$.next((courses: ICourse[]) => {
      return courses.concat(new Course());
    });
  }

  public updateCourse(course: ICourse): void {
    this._updates$.next((courses: ICourse[]) => {
      return courses.map((currentCourse: ICourse) => {
        if (currentCourse.id === course.id) {
          currentCourse = course;
        }
        return course;
      });
    });
  }

  public deleteCourse$(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${this._coursesEndpoint}/${id}`);
  }

  private mapDtosToModel(courseDtos: ICourseDto[]): ICourse[] {
    return courseDtos.map((courseDto) => {
      return this.mapDtoToModel(courseDto);
    });
  }

  private mapDtoToModel(courseDto: ICourseDto): ICourse {
    return {
      id: courseDto.id,
      title: courseDto.title,
      date: new Date(courseDto.date),
      durationMinutes: Math.ceil(courseDto.durationSeconds / 60),
      description: courseDto.description,
      topRated: courseDto.topRated,
      authors: courseDto.authors,
    };
  }
}
