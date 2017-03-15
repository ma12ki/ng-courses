import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as faker from 'Faker';

import { ICourse, Course } from './../entities/course';

@Injectable()
export class CoursesService {
  private courses = this.generateCourses();

  public getCourses(): Observable<ICourse[]> {
    return Observable.of(this.courses);
  }

  public createCourse(course): Observable<ICourse> {
    return Observable.of(new Course());
  }

  public getCourseById(id: number): Observable<ICourse> {
    return Observable.of(this.courses.find((course) => course.id === id));
  }

  public updateCourse(course: ICourse): Observable<ICourse> {
    this.courses = this.courses.map((currentCourse) => {
      if (currentCourse.id === course.id) {
        currentCourse = course;
      }
      return currentCourse;
    });
    return Observable.of(course);
  }

  public deleteCourse(id: number): Observable<void> {
    this.courses = this.courses.filter((course) => course.id !== id );
    return Observable.of(null);
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
