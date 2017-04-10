import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }

  public show(): void {
    this._show$.next(true);
  }

  public hide(): void {
    this._show$.next(false);
  }

}
