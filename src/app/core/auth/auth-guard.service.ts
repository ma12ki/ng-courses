import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot) {
    console.log(this.authService);
    console.log(this.authService.isAuthenticated);
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
