import { IListParams, IListResult } from '../courses.actions';
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
  private _coursesEndpoint: string = 'courses';

  constructor(
    @Inject(API_URL) private API_URL: string,
    private http: Http,
  ) { }

  public getCourseById$(id: number): Observable<ICourse> {
    return this.http.get(`${this.API_URL + this._coursesEndpoint}/${id}`)
      .map((response) => response.json())
      .map(this.mapDtoToModel);
  }

  public fetchCourses$(params: IListParams): Observable<IListResult> {
    const options: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
      params: {
        _start: params.offset,
        _limit: params.itemsPerPage,
        title_like: params.searchTerm,
      },
    };
    const ret: IListResult = {
      items: [],
      totalItems: 0,
    };
    return this.http.get(this.API_URL + this._coursesEndpoint, options)
      .do((response) => {
        const totalItems = +response.headers.get('x-total-count');
        ret.totalItems = totalItems;
      })
      .map((response) => response.json())
      .map((courseDtos: ICourseDto[]) => this.mapDtosToModel(courseDtos))
      .map((courses: ICourse[]) => {
        ret.items = courses;
        return ret;
      });
  }

  public saveCourse(course: ICourse): Observable<any> {
    if (course.id == null) {
      return this.createCourse(course);
    } else {
      return this.updateCourse(course);
    }
  }

  public createCourse(course: ICourse): Observable<any> {
    return this.http.post(
      `${this.API_URL}${this._coursesEndpoint}`,
      this.mapModelToDto(course),
    );
  }

  public updateCourse(course: ICourse): Observable<any> {
    return this.http.put(
      `${this.API_URL}${this._coursesEndpoint}/${course.id}`,
      this.mapModelToDto(course),
    );
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

  private mapModelToDto(course: ICourse): ICourseDto {
    return {
      id: course.id,
      title: course.title,
      date: course.date.toISOString(),
      durationSeconds: course.durationMinutes * 60,
      description: course.description,
      topRated: course.topRated,
      authors: course.authors,
    };
  }
}
