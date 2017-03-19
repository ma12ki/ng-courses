import {
  Component,
  OnInit
} from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'c-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    console.log('LoginComponent init');
  }

  public login() {
    this.authService.login('lol', 'mao');
  }
}
