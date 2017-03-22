/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    public appState: AppState,
    private ngZone: NgZone,
  ) {
    const timerName = 'ngZoneTimer';
    ngZone.onUnstable.subscribe(() => {
      console.info('onUnstable');
      console.time(timerName);
    });
    ngZone.onStable.subscribe(() => {
      console.info('onStable');
      console.timeEnd(timerName);
    });
  }

  public ngOnInit() {
    console.log('AppComponent init');
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
