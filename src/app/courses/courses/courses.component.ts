import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs';
import * as moment from 'moment';
import { Store } from '@ngrx/store';

import { ICourse } from '../shared/course.entity';
import { CourseDeleteModalComponent } from '../course-delete-modal/';
import { LoadStartAction, RemoveStartAction } from '../courses.actions';
import { coursesSelectors, State } from '../../app.reducer';

@Component({
  selector: 'c-courses',
  styleUrls: [ './courses.component.scss' ],
  templateUrl: './courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {

  public courses$: Observable<ICourse[]>;
  public totalCourses$: Observable<number>;
  public offset$: Observable<number>;
  public itemsPerPage$: Observable<number>;
  public searchTerm$: Observable<string>;
  public offset: number = 0;
  public itemsPerPage: number = 5;
  private searchTerm: string = '';
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MdDialog,
    private store: Store<State>,
  ) {
    this.courses$ = this.store.select(coursesSelectors.getItems);
    this.totalCourses$ = this.store.select(coursesSelectors.getTotalItems);
    this.itemsPerPage$ = this.store.select(coursesSelectors.getItemsPerPage);
    this.offset$ = this.store.select(coursesSelectors.getOffset);
    this.searchTerm$ = this.store.select(coursesSelectors.getSearchTerm);
  }

  public ngOnInit(): void {
    this.fetchCourses();
  }

  public fetchCourses(offset = 0, searchTerm = ''): void {
    this.store.dispatch(new LoadStartAction({ offset, searchTerm }));
  }

  public deleteCourse(courseId: number): void {
    const dialogRef = this.dialog.open(CourseDeleteModalComponent);
    this._subscriptions.push(
      dialogRef.afterClosed()
        .filter((result) => result)
        .do(() => this.store.dispatch(new RemoveStartAction(courseId)))
        .subscribe());
  }

  public editCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }

  public onSearch(searchTerm: string): void {
    this.fetchCourses(0, searchTerm);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
