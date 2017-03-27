import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { LoaderService } from './../../shared/loader/loader.service';

@Component({
  selector: 'c-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
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
    this.authService.login('meh', 'w/e')
      .do(() => this.loaderService.hide())
      .do(() => this.router.navigate(['']))
      .subscribe();
  }
}
