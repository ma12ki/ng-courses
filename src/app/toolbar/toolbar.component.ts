import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-toolbar',
  styleUrls: [ './toolbar.component.scss' ],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
  public ngOnInit() {
    console.log('ToolbarComponent init');
  }
}
