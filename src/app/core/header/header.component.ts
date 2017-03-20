import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'c-header',
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
  ) {
    this.isUserAuthenticated$ = authService.isAuthenticated$();
  }

  public ngOnInit() {
    console.log('HeaderComponent init');
  }

  public logout() {
    this.authService.logout();
  }
}
