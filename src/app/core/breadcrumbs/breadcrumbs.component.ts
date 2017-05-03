import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  Params,
  NavigationEnd,
} from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  ) {}

  public ngOnInit() {
    this._subscriptions.push(
      this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((_event) => {
        console.log(_event);
        this.updateBreadcrumbs();
      })
    );

    // this.route..subscribe((f) => console.log('fragment', f));
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  private updateBreadcrumbs() {
    this.breadcrumbs = [];
    // console.log(this.route.snapshot.pathFromRoot.length);
    // console.log(this.route.snapshot.pathFromRoot);
    // console.log(this.route.snapshot);
    let currentRoute = this.route.snapshot;
    console.log(currentRoute);
    console.log(this.router.config);
    console.log(this.router.routerState);

    // while (currentRoute.parent) {
    //   console.log(JSON.stringify(currentRoute.data));
    //   // if (currentRoute.data.label) {
    //   //   this.breadcrumbs.push({
    //   //     label: currentRoute.data.label,
    //   //     url: currentRoute.url[0].path,
    //   //   });
    //   // }
    //   currentRoute = currentRoute.parent;
    // }

    // this.route.snapshot.pathFromRoot
    //   .forEach((route) => {
    //     if (route.data.label) {
    //       this.breadcrumbs.push({
    //         label: route.data.label,
    //         url: route.url[0].path,
    //       });
    //     }
    //   });

    console.log(this.breadcrumbs);
  }

}
