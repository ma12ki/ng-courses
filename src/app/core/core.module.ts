import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { PerformanceService } from './performance/performance.service';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { BreadcrumbsComponent } from './breadcrumbs';
import { NavComponent } from './nav';
import { NoContentComponent } from './no-content';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    BrowserAnimationsModule,
    MomentModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    NavComponent,
    NoContentComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PerformanceService,
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
