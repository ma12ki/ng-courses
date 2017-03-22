import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'c-footer',
  styleUrls: [ './footer.component.scss' ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public ngOnInit() {
    console.log('FooterComponent init');
  }
}
