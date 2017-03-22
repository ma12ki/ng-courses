import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'c-nav',
  styleUrls: [ './nav.component.scss' ],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  public isUserAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.isUserAuthenticated$ = authService.isAuthenticated$();
  }

  public ngOnInit() {
    console.log('NavComponent init');
  }

  public logout() {
    this.authService.logout();
  }

  public navigate(link: string) {
    this.router.navigateByUrl(link);
  }
}
