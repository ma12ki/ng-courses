import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { LoaderService } from './../../shared/loader/loader.service';
import { authSelectors, State } from '../../app.reducer';
import { LogoutStartAction } from '../auth/auth.actions';

@Component({
  selector: 'c-nav',
  styleUrls: [ './nav.component.scss' ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public isUserAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private store: Store<State>,
  ) {
    this.isUserAuthenticated$ = this.store.select(authSelectors.isAuthenticated);
  }

  public logout() {
    this.store.dispatch(new LogoutStartAction());
  }

  public navigate(link: string) {
    this.router.navigateByUrl(link);
  }
}
