import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { authSelectors, State } from '../../app.reducer';

@Injectable()
export class AuthGuardService implements CanActivate {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private store: Store<State>
  ) {
    this.store.select(authSelectors.isAuthenticated)
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  public canActivate(route: ActivatedRouteSnapshot) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
