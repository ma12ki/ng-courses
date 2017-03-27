import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './../core/auth/auth-guard.service';
import { CoursesComponent } from './courses';

const routes: Routes = [
  { path: '', component: CoursesComponent, canActivate: [AuthGuardService] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
