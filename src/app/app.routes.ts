import { Routes } from '@angular/router';

import { NoContentComponent } from './core/no-content';

export const ROUTES: Routes = [
  { path: '', loadChildren: 'app/courses/courses.module#CoursesModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: '**', component: NoContentComponent },
];
