import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

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
  ) {}

  public ngOnInit() {
    console.log('LoginComponent init');
  }

  public login() {
    this.loaderService.show();
    this.authService.login('meh', 'w/e')
      .subscribe(null, null, () => this.loaderService.hide());
  }
}
