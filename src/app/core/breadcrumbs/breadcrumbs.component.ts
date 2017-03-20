import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'c-breadcrumbs',
  styleUrls: [ './breadcrumbs.component.scss' ],
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {
  public ngOnInit() {
    console.log('BreadcrumbsComponent init');
  }
}
