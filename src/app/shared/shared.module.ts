import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RequestOptions,
  XHRBackend,
} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { MomentModule } from 'angular2-moment';

import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
  ],
  declarations: [
    LoaderComponent,
    PaginationComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    LoaderComponent,
    PaginationComponent,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LoaderService,
        // not working because MdIconModule overrides this with the standard Http provider
        // {
        //   provide: Http,
        //   useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        //     return new AuthorizedHttp(backend, defaultOptions);
        //   },
        //   deps: [ XHRBackend, RequestOptions ],
        // },
      ],
    };
  };
}
