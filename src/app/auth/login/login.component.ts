import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public ngOnInit() {
    console.log('LoginComponent init');
  }
}
