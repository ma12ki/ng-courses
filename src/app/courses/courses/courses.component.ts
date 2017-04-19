import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs';
import * as moment from 'moment';

import { LoaderService } from './../../shared/loader/loader.service';
import { CoursesService } from '../shared/courses.service';
import { CourseFindPipe } from '../shared/course-find.pipe';
import { ICourse } from '../shared/course.entity';
import { CourseDeleteModalComponent } from '../course-delete-modal/';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {

  public courses$: Observable<ICourse[]>;
  public totalCourses$: Observable<number>;
  public offset: number = 0;
  public itemsPerPage: number = 5;
  private searchTerm: string = '';
  private _subscriptions: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private dialog: MdDialog,
    private courseFindPipe: CourseFindPipe,
  ) { }

  public ngOnInit(): void {
    this.initTotalCourses();
    this.initCourses();
    this.fetchCourses();
  }

  public initTotalCourses(): void {
    this.totalCourses$ = this.coursesService.totalCourses$;
  }

  public initCourses(): void {
    this.courses$ = this.coursesService.courses$;
  }

  public fetchCourses(offset: number = 0): void {
    this.offset = offset;
    this.loaderService.show();
    this._subscriptions.push(
      this.coursesService.fetchCourses$(offset, this.itemsPerPage, this.searchTerm)
        .do(() => this.loaderService.hide())
        .subscribe());
  }

  public deleteCourse(courseId: number): void {
    const dialogRef = this.dialog.open(CourseDeleteModalComponent);
    this._subscriptions.push(
      dialogRef.afterClosed()
        .filter((result) => result)
        .do(() => this.loaderService.show())
        .switchMap(() => this.coursesService.deleteCourse$(courseId))
        .do(() => this.loaderService.hide())
        .do(() => this.fetchCourses(0))
        .subscribe());
  }

  public onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.fetchCourses(0);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
