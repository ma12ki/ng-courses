import { Observable } from 'rxjs/Rx';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthorsService } from '../shared/authors.service';
import { ICourse } from '../shared/course.entity';
import { IAuthor } from '../shared/author.entity';

@Component({
  selector: 'c-course-edit',
  styleUrls: [ './course-edit.component.scss' ],
  templateUrl: './course-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent implements OnInit, OnDestroy {
  public courseId: number;
  public authors$: Observable<IAuthor[]>;
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
  ) {}

  public ngOnInit(): void {
    this._subscriptions.push(
      this.route.params.subscribe((params) => {
        this.courseId = params.id == null ? null : +params.id;
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

  public save(): void {
    console.log('save: implement me!');
  }

  public cancel(): void {
    this.router.navigate(['']);
  }
}
