import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { BreadcrumbsComponent } from './breadcrumbs/';
import { NoContentComponent } from './no-content';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    MomentModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    NoContentComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    MomentModule,
    FooterComponent,
    HeaderComponent,
    NoContentComponent,
  ],
})
export class CoreModule { }
