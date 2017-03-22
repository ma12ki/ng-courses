import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { LoaderService } from './../../shared/loader/loader.service';

@Component({
  selector: 'c-nav',
  styleUrls: [ './nav.component.scss' ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  public isUserAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
  ) {
    this.isUserAuthenticated$ = authService.isAuthenticated$();
  }

  public ngOnInit() {
    console.log('NavComponent init');
  }

  public logout() {
    this.loaderService.show();
    this.authService.logout()
      .subscribe(null, null, () => this.loaderService.hide());
  }

  public navigate(link: string) {
    this.router.navigateByUrl(link);
  }
}
