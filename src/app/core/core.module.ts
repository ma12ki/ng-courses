import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  XHRBackend,
  RequestOptions,
  HttpModule,
  Http,
} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { SharedModule } from './../shared/shared.module';

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
    FlexLayoutModule.forRoot(),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    MomentModule,
    // HttpModule,
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
    // {
    //   provide: Http,
    //   useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
    //     return new AuthorizedHttp(backend, defaultOptions);
    //   },
    //   deps: [ XHRBackend, RequestOptions ],
    //   // useClass: AuthorizedHttp,
    // },
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MomentModule,
    FooterComponent,
    HeaderComponent,
    NoContentComponent,
  ],
})
export class CoreModule { }
