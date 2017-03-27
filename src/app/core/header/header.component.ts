import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { IUser } from './../../entities/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'c-header',
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated$: Observable<boolean>;
  public userInfo$: Observable<IUser>;

  constructor(
    private authService: AuthService,
  ) {
    this.isUserAuthenticated$ = authService.isAuthenticated$;
    this.userInfo$ = authService.userInfo$;
  }

  public ngOnInit() {
    console.log('HeaderComponent init');
  }

  public logout() {
    this.authService.logout();
  }
}
