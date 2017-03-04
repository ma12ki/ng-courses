import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoursesContainerComponent } from './courses-container/courses-container.component';

@NgModule({
  declarations: [
    CoursesContainerComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [
    CoursesContainerComponent,
  ]
})
export class CoursesModule {}
