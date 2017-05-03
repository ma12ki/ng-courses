import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { CoursesService } from './shared/courses.service';

@Injectable()
export class CourseTitleResolver implements Resolve<string> {
  constructor(
    private coursesService: CoursesService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    const { id } = route.params;

    return this.coursesService.getCourseById$(id)
      .toPromise()
      .then((course) => {
        return `Edit "${course.title}"`;
      });
  }
}
