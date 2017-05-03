import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  Params,
  NavigationEnd,
  PRIMARY_OUTLET,
} from '@angular/router';
import { Subscription } from 'rxjs/Rx';

interface IBreadcrumb {
  label: string;
  url: string;
};

@Component({
  selector: 'c-breadcrumbs',
  styleUrls: [ './breadcrumbs.component.scss' ],
  templateUrl: './breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public breadcrumbs: IBreadcrumb[];
  private _subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this._subscriptions.push(
      this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((_event) => {
        this.updateBreadcrumbs();
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  private updateBreadcrumbs() {
    this.breadcrumbs = [];
    let currentRoute = this.route.snapshot;

    while (currentRoute) {
      if (currentRoute.data.label && currentRoute.url.length) {
        this.breadcrumbs.push({
          label: currentRoute.data.label,
          url: [this.getCurrentUrlPath(), currentRoute.url[0].path].join('/'),
        });
      }
      currentRoute = currentRoute.firstChild;
    }

    this.cd.markForCheck();
  }

  private getCurrentUrlPath(): string {
    return this.breadcrumbs.map((crumb) => crumb.url).join('/');
  }
}
