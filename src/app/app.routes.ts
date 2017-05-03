import { Routes } from '@angular/router';

import { NoContentComponent } from './core/no-content';

export const ROUTES: Routes = [
  {
    path: 'courses',
    loadChildren: 'app/courses/courses.module#CoursesModule',
    data: {
      label: 'Courses',
    },
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    data: {
      label: 'Login',
    },
  },
  {
    path: '**',
    component: NoContentComponent,
    data: {
      label: '404',
    },
  },
];
