import { NgModule } from '@angular/core';

import { CoursesSharedModule } from './shared/shared.module';
import { routing } from './courses.routes';

import { CourseTitleResolver } from './course-title.resolver';
import { CoursesComponent } from './courses';
import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';
import { CourseDeleteModalComponent } from './course-delete-modal';
import { CourseEditComponent } from './course-edit/course-edit.component';
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
    CourseEditComponent,
    ToolbarComponent,
  ],
  entryComponents: [
    CourseDeleteModalComponent,
  ],
  providers: [
    CourseTitleResolver,
  ],
})
export class CoursesModule { }
