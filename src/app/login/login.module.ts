import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { routing } from './login.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    // LoginComponent,
  ],
})
export class LoginModule { }
