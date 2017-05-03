import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './../core/auth/auth-guard.service';
import { CourseTitleResolver } from './course-title.resolver';
import { CoursesComponent } from './courses';
import { CourseEditComponent } from './course-edit';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'new',
    component: CourseEditComponent,
    canActivate: [AuthGuardService],
    data: {
      label: 'New course',
    },
  },
  {
    path: ':id',
    component: CourseEditComponent,
    canActivate: [AuthGuardService],
    resolve: {
      label: CourseTitleResolver,
    },
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
