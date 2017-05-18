import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { IUser } from '../../shared/user.entity';
import { authSelectors, State } from '../../app.reducer';
import { LogoutStartAction } from '../auth/auth.actions';

@Component({
  selector: 'c-header',
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isUserAuthenticated$: Observable<boolean>;
  public userInfo$: Observable<IUser>;

  constructor(
    private store: Store<State>,
  ) {
    this.isUserAuthenticated$ = this.store.select(authSelectors.isAuthenticated);
    this.userInfo$ = this.store.select(authSelectors.getUser);
  }

  public logout() {
    this.store.dispatch(new LogoutStartAction());
  }
}
