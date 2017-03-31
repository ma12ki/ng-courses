import { PipeTransform, Pipe } from '@angular/core';

import { ICourse } from './course.entity';

@Pipe({ name: 'cCourseFind' })
export class CourseFindPipe implements PipeTransform {
  public transform(courses: ICourse[], searchTerm: string) {
    return courses.filter((course) => {
      return course.title.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm;
    });
  }
}
