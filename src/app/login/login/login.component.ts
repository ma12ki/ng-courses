import { LoginStartAction } from '../../core/auth/auth.actions';
import { State } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IUserCredentials } from '../../shared/user.entity';
import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './../../shared/loader/loader.service';

@Component({
  selector: 'c-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _subscriptions: Subscription[] = [];

  constructor(
    private store: Store<State>,
  ) {}

  public login(login, password) {
    const credentials: IUserCredentials = {
      login,
      password,
    };

    this.store.dispatch(new LoginStartAction(credentials));
  }
}
