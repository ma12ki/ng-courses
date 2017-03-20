import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses';

const routes: Routes = [
  { path: '', component: CoursesComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
