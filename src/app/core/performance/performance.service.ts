import { Observable } from 'rxjs/Observable';
import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class PerformanceService {
  constructor(
    private ngZone: NgZone,
  ) {
    const timerName = 'ngZoneTimer';
    this.ngZone.onUnstable.subscribe(() => {
      // console.info('onUnstable');
      // tslint:disable no-console
      console.time(timerName);
    });
    this.ngZone.onStable.subscribe(() => {
      // console.info('onStable');
      // tslint:disable no-console
      console.timeEnd(timerName);
    });
  }
}
