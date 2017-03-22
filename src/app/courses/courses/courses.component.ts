import { Observable } from 'rxjs/Observable';
import 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { LoaderService } from './../../shared/loader/loader.service';
import { CoursesService } from '../shared/courses.service';
import { ICourse } from '../shared/course.entity';
import { CourseDeleteModalComponent } from '../course-delete-modal/';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  public courses: Observable<ICourse[]>;

  constructor(
    private coursesService: CoursesService,
    private loaderService: LoaderService,
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
      .do(() => this.loaderService.show())
      .switchMap(() => this.coursesService.deleteCourse(courseId) )
      .do(() => this.loaderService.hide())
      .subscribe();
  }
}
