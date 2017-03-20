import { NgModule } from '@angular/core';

import { CoursesSharedModule } from './shared/shared.module';
import { routing } from './courses.routes';

import { CoursesComponent } from './courses';
import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';
import { CourseDeleteModalComponent } from './course-delete-modal';
import { ToolbarComponent } from './toolbar';

@NgModule({
  imports: [
    CoursesSharedModule,
    routing,
  ],
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseItemComponent,
    CourseDeleteModalComponent,
    ToolbarComponent,
  ],
  entryComponents: [
    CourseDeleteModalComponent,
  ],
})
export class CoursesModule { }
