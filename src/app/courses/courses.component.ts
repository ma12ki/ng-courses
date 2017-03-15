import { Observable } from 'rxjs/Observable';
import 'rxjs';
import {
  Component,
  OnInit
} from '@angular/core';

import { CoursesService } from './courses.service';
import { ICourse } from './../entities/course';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  public courses: Observable<ICourse[]>;

  constructor(
    private coursesService: CoursesService,
  ) { }

  public ngOnInit(): void {
    this.fetchCourses();
  }

  public fetchCourses(): void {
    this.courses = this.coursesService.getCourses();
  }

  public deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId);
  }
}
