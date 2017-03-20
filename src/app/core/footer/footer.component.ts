import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-footer',
  styleUrls: [ './footer.component.scss' ],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public ngOnInit() {
    console.log('FooterComponent init');
  }
}
