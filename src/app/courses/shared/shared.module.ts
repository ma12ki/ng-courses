import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CoursesService } from './courses.service';
import { CourseFindPipe } from './course-find.pipe';
import { CourseDurationPipe } from './course-duration.pipe';
import { OrderByPipe } from './order-by.pipe';
import { CourseHighlightDirective } from './course-highlight.directive';

@NgModule({
  declarations: [
    CourseDurationPipe,
    CourseFindPipe,
    OrderByPipe,
    CourseHighlightDirective,
  ],
  providers: [
    CoursesService,
    CourseFindPipe,
  ],
  exports: [
    SharedModule,
    CourseDurationPipe,
    CourseFindPipe,
    OrderByPipe,
    CourseHighlightDirective,
  ],
})
export class CoursesSharedModule { }
