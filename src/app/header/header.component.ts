import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-header',
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public ngOnInit() {
    console.log('HeaderComponent init');
  }
}
