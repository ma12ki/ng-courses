import { NgModule } from '@angular/core';
import {
  MdIconModule,
  MdProgressSpinnerModule,
  MdCardModule,
  MdInputModule,
  MdButtonModule,
  MdListModule,
  MdDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdIconModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdDialogModule,
  ],
})
export class CustomMaterialModule {}
