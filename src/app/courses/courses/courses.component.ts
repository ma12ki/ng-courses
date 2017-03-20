import { Observable } from 'rxjs/Observable';
import 'rxjs';
import {
  Component,
  OnInit
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { CoursesService } from '../shared/courses.service';
import { ICourse } from '../shared/course.entity';
import { CourseDeleteModalComponent } from '../course-delete-modal/';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  public courses: Observable<ICourse[]>;

  constructor(
    private coursesService: CoursesService,
    private dialog: MdDialog,
  ) { }

  public ngOnInit(): void {
    this.fetchCourses();
  }

  public fetchCourses(): void {
    this.courses = this.coursesService.getCourses();
  }

  public deleteCourse(courseId: number): void {
    const dialogRef = this.dialog.open(CourseDeleteModalComponent);
    dialogRef.afterClosed()
      .filter((result) => result)
      .subscribe(() => {
        this.coursesService.deleteCourse(courseId);
      });
  }
}
