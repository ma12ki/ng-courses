import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RequestOptions,
  XHRBackend,
  Http,
} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { CustomMaterialModule } from './custom-material.module';
import { FormHelpersModule } from './form-helpers/form-helpers.module';

import { AuthorizedHttp } from './authorized-http.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { PaginationComponent } from './pagination/pagination.component';

const AUTHORIZED_HTTP_PROVIDER = {
  provide: Http,
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
    return new AuthorizedHttp(backend, defaultOptions);
  },
  deps: [ XHRBackend, RequestOptions ],
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
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
    CustomMaterialModule,
    MomentModule,
    LoaderComponent,
    PaginationComponent,
    FormHelpersModule,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LoaderService,
        AUTHORIZED_HTTP_PROVIDER,
      ],
    };
  };
  // dedicated module with providers that just override the Http provider
  // which is being overriden by that darned MdIconModule
  public static forStupidMdIconModule(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AUTHORIZED_HTTP_PROVIDER,
      ],
    };
  };
}
