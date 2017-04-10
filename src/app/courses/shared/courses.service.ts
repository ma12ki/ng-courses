import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs';
import * as moment from 'moment';
import * as faker from 'Faker';

import { ICourseDto, CourseDto } from './course-dto.entity';
import { ICourse, Course } from './course.entity';

interface ICourseOperation extends Function {
  (courses: ICourse[]): ICourse[];
}

@Injectable()
export class CoursesService {
  private _courses$: Observable<ICourse[]>;
  private _updates$: BehaviorSubject<any> = new BehaviorSubject<any>((i) => i);

  constructor() {
    const initialCourses: ICourse[] = this.mapDtoToModel(this.generateCourses());

    this._courses$ = this._updates$
      .scan((courses: ICourse[], operation: ICourseOperation) => {
        return operation(courses);
      }, initialCourses)
      .publishReplay(1)
      .refCount();
  }

  public get courses$(): Observable<ICourse[]> {
    return this._courses$;
  }

  public getCourseById$(id: number): Observable<ICourse> {
    return this._courses$.flatMap((courses: ICourse[]) => {
      return Observable.of(courses.find((course: ICourse) => {
        return course.id === id;
      }));
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

  public deleteCourse$(id: number): Observable<null> {
    return Observable.of(null)
      .delay(1000)
      .do(() => {
        this._updates$.next((courses: ICourse[]) => {
          return courses.filter((course) => {
            return course.id !== id;
          });
        });
      });
  }

  private generateCourses(): ICourseDto[] {
    const courses: ICourseDto[] = [];

    courses.push(new CourseDto(
      'Fresh!',
      moment().subtract(1, 'day').toDate().toISOString(),
    ));
    courses.push(new CourseDto(
      'Upcoming!',
      moment().add(5, 'days').toDate().toISOString(),
    ));
    courses.push(new CourseDto(
      'Almost outdated!',
      moment().subtract(13, 'days').toDate().toISOString(),
    ));
    courses.push(new CourseDto(
      'Outdated!',
      moment().subtract(15, 'days').toDate().toISOString(),
    ));

    for (let i = 0; i < 3; i++) {
      courses.push(new CourseDto());
    }

    return courses;
  }

  private mapDtoToModel(courses: ICourseDto[]): ICourse[] {
    return courses.map((courseDto) => {
      return {
        id: courseDto.id,
        title: courseDto.title,
        date: new Date(courseDto.dateCreated),
        durationMinutes: Math.ceil(courseDto.durationSeconds / 60),
        description: courseDto.description,
        topRated: courseDto.topRated,
      };
    });
  }
}
