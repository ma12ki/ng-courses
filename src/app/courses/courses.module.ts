import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesContainerComponent } from './courses-container/courses-container.component';

@NgModule({
  declarations: [
    CoursesContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CoursesContainerComponent,
  ]
})
export class CoursesModule {}
