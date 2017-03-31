import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CoursesService } from './courses.service';
import { CourseDurationPipe } from './course-duration.pipe';
import { OrderByPipe } from './order-by.pipe';
import { CourseHighlightDirective } from './course-highlight.directive';

@NgModule({
  declarations: [
    CourseDurationPipe,
    OrderByPipe,
    CourseHighlightDirective,
  ],
  providers: [
    CoursesService,
  ],
  exports: [
    SharedModule,
    CourseDurationPipe,
    OrderByPipe,
    CourseHighlightDirective,
  ],
})
export class CoursesSharedModule { }
