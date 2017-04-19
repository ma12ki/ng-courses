import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';
import { LoaderService } from './../../shared/loader/loader.service';

@Component({
  selector: 'c-nav',
  styleUrls: [ './nav.component.scss' ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit, OnDestroy {
  public isUserAuthenticated$: Observable<boolean>;
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
  ) {
    this.isUserAuthenticated$ = authService.isAuthenticated$;
  }

  public ngOnInit() {
    console.log('NavComponent init');
  }

  public logout() {
    this.loaderService.show();
    this._subscriptions.push(
      this.authService.logout()
        .do(() => this.loaderService.hide())
        .do(() => this.router.navigate(['/login']))
        .subscribe());
  }

  public navigate(link: string) {
    this.router.navigateByUrl(link);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
