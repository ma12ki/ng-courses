import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { CustomMaterialModule } from '../../../shared/custom-material.module';
import { CoursesHelpersModule } from '../course-helpers/course-helpers.module';

import { CourseDurationPipe } from '../course-duration.pipe';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { DurationInputComponent } from './duration-input/duration-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    MomentModule,
    CoursesHelpersModule,
  ],
  declarations: [
    DurationInputComponent,
    AuthorsInputComponent,
  ],
  exports: [
    DurationInputComponent,
    AuthorsInputComponent,
  ],
})
export class CoursesFormHelpersModule {}
