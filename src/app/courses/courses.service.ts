import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as faker from 'Faker';

import { ICourse, Course } from './../entities/course';

@Injectable()
export class CoursesService {
  public getCourses(): Observable<ICourse[]> {
    return Observable.of(this.generateCourses());
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
