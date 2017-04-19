import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../core/auth/auth.service';
import { LoaderService } from './../../shared/loader/loader.service';

@Component({
  selector: 'c-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router,
  ) {}

  public ngOnInit() {
    console.log('LoginComponent init');
  }

  public login() {
    this.loaderService.show();
    this._subscriptions.push(
      this.authService.login('meh', 'w/e')
        .do(() => this.loaderService.hide())
        .do(() => this.router.navigate(['']))
        .subscribe());
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
