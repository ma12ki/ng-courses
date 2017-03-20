import { Routes } from '@angular/router';

import { NoContentComponent } from './core/no-content';
import { CoursesComponent } from './courses';
import { LoginComponent } from './auth/login';

export const ROUTES: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoContentComponent },
];
