import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { CustomMaterialModule } from '../custom-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    MomentModule,
  ],
  declarations: [
  ],
  exports: [
  ],
})
export class FormHelpersModule {}
