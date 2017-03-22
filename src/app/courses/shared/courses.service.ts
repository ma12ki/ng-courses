import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs';
import * as faker from 'Faker';

import { ICourse, Course } from './course.entity';

interface ICourseOperation extends Function {
  (courses: ICourse[]): ICourse[];
}

@Injectable()
export class CoursesService {
  private courses: Observable<ICourse[]>;
  private updates: BehaviorSubject<any> = new BehaviorSubject<any>((i) => i);

  constructor() {
    const initialCourses = this.generateCourses();

    this.courses = this.updates
      .scan((courses: ICourse[], operation: ICourseOperation) => {
        return operation(courses);
      }, initialCourses)
      .publishReplay(1)
      .refCount();
  }

  public getCourses(): Observable<ICourse[]> {
    return this.courses;
  }

  public getCourseById(id: number): Observable<ICourse> {
    return this.courses.flatMap((courses: ICourse[]) => {
      return Observable.of(courses.find((course: ICourse) => {
        return course.id === id;
      }));
    });
  }

  public addCourse(course): void {
    this.updates.next((courses: ICourse[]) => {
      return courses.concat(new Course());
    });
  }

  public updateCourse(course: ICourse): void {
    this.updates.next((courses: ICourse[]) => {
      return courses.map((currentCourse: ICourse) => {
        if (currentCourse.id === course.id) {
          currentCourse = course;
        }
        return course;
      });
    });
  }

  public deleteCourse(id: number): void {
    this.updates.next((courses: ICourse[]) => {
      return courses.filter((course) => {
        return course.id !== id;
      });
    });
  }

  private generateCourses(): ICourse[] {
    const courses: ICourse[] = [];
    const numberOfCourses: number = faker.random.number(7) + 3;

    for (let i = 0; i < numberOfCourses; i++) {
      courses.push(new Course());
    }

    return courses;
  }
}