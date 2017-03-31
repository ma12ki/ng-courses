import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CoursesService } from './courses.service';
import { CourseDurationPipe } from './course-duration.pipe';
import { CourseHighlightDirective } from './course-highlight.directive';

@NgModule({
  declarations: [
    CourseDurationPipe,
    CourseHighlightDirective,
  ],
  providers: [
    CoursesService,
  ],
  exports: [
    SharedModule,
    CourseDurationPipe,
    CourseHighlightDirective,
  ],
})
export class CoursesSharedModule { }
