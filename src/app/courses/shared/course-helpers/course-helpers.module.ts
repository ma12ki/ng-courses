import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { CourseFindPipe } from './course-find.pipe';
import { CourseDurationPipe } from './course-duration.pipe';
import { CourseHighlightDirective } from './course-highlight.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MomentModule,
  ],
  declarations: [
    CourseFindPipe,
    CourseDurationPipe,
    CourseHighlightDirective,
  ],
  providers: [
    CourseFindPipe,
  ],
  exports: [
    CourseFindPipe,
    CourseDurationPipe,
    CourseHighlightDirective,
  ],
})
export class CoursesHelpersModule {}
