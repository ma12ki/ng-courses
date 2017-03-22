import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'c-breadcrumbs',
  styleUrls: [ './breadcrumbs.component.scss' ],
  templateUrl: './breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  public ngOnInit() {
    console.log('BreadcrumbsComponent init');
  }
}
