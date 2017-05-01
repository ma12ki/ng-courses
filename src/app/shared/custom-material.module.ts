import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdInputModule,
  MdCheckboxModule,
  MdButtonModule,
  MdListModule,
  MdChipsModule,
  MdCardModule,
  MdIconModule,
  MdDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    MdToolbarModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    MdListModule,
    MdChipsModule,
    MdCardModule,
    MdIconModule,
    MdDialogModule,
  ],
})
export class CustomMaterialModule {}
