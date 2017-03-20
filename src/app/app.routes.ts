import { Routes } from '@angular/router';

import { NoContentComponent } from './core/no-content';
import { CoursesComponent } from './courses';

export const ROUTES: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: '**', component: NoContentComponent },
];
