import { Store } from '@ngrx/store';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../../shared/loader';
import { AuthorsService } from '../shared/authors.service';
import { CoursesService } from '../shared/courses.service';
import { ICourse } from '../shared/course.entity';
import { IAuthor } from '../shared/author.entity';
import { coursesSelectors, State } from '../../app.reducer';
import { LoadOneStartAction, SaveStartAction } from '../courses.actions';

interface IFormValue {
  title: string;
  description: string;
  date: Date;
  duration: number;
  authors: number[];
};

@Component({
  selector: 'c-course-edit',
  styleUrls: [ './course-edit.component.scss' ],
  templateUrl: './course-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent implements OnInit, OnDestroy {
  public editMode = false;
  public course: ICourse | {} = {};
  public courseId: number;
  public authors$: Observable<IAuthor[]>;
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private cd: ChangeDetectorRef,
    private store: Store<State>,
  ) {}

  public ngOnInit(): void {
    this._subscriptions.push(
      this.route.params.subscribe((params) => {
        if (params.id != null && !isNaN(+params.id)) {
          this.courseId = +params.id;
          this.editMode = true;
        } else {
          this.courseId = null;
          this.editMode = false;
        }
        this.store.dispatch(new LoadOneStartAction(params.id));
      })
    );
    this._subscriptions.push(
      this.store.select(coursesSelectors.getCourseToEdit)
        .subscribe((course) => {
          this.course = course;
        })
    );
    this._subscriptions.push(
      this.authorsService.fetchAuthors$().subscribe(null, console.error)
    );
    this.authors$ = this.authorsService.authors$;
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public save(formValue: IFormValue): void {
    const course: ICourse = {
      id: this.courseId,
      title: formValue.title,
      description: formValue.description,
      date: formValue.date,
      durationMinutes: formValue.duration,
      topRated: (this.course as any).topRated,
      authors: formValue.authors,
    };
    this.store.dispatch(new SaveStartAction(course));
  }

  public cancel(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    this.router.navigate(['']);
  }
}
