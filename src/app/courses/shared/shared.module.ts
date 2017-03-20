import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CourseDurationPipe } from './course-duration.pipe';
import { CoursesService } from './courses.service';

@NgModule({
  declarations: [
    CourseDurationPipe,
  ],
  providers: [
    CoursesService,
  ],
  exports: [
    SharedModule,
    CourseDurationPipe,
  ],
})
export class CoursesSharedModule { }
