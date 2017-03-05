import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content';
import { CoursesComponent } from './courses';
import { LoginComponent } from './login';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
