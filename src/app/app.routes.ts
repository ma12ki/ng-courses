import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content';
import { CoursesComponent } from './courses';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: CoursesComponent },
  { path: '**',    component: NoContentComponent },
];
