import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs';
import * as faker from 'Faker';

import { IUser } from '../../entities/user';

@Injectable()
export class AuthService {
  private static TOKEN_STORAGE_KEY = 'AUTH_TOKEN';
  private static USER_STORAGE_KEY = 'AUTH_USER';
  private _hasToken: boolean;
  private _hasToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userInfo$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor() {
    this._hasToken = !!localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
    this._hasToken$.next(this._hasToken);
    this._userInfo$.next(JSON.parse(localStorage.getItem(AuthService.USER_STORAGE_KEY)));
  }

  public get isAuthenticated(): boolean {
    return this._hasToken;
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this._hasToken$;
  }

  public login(login: string, password: string): Observable<IUser> {
    const userInfo: IUser = { login };
    localStorage.setItem(AuthService.USER_STORAGE_KEY, JSON.stringify(userInfo));
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, faker.Company.bs());

    return Observable.of(userInfo)
      .delay(1000)
      .do(() => console.info('successfully logged in!'))
      .do(() => {
        this._hasToken = true;
        this._hasToken$.next(this._hasToken);
        this._userInfo$.next(userInfo);
      });
  }

  public logout(): Observable<null> {
    localStorage.removeItem(AuthService.USER_STORAGE_KEY);
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);

    return Observable.of(null)
      .delay(1000)
      .do(() => console.info('successfully logged out!'))
      .do(() => {
        this._hasToken = false;
        this._hasToken$.next(this._hasToken);
        this._userInfo$.next(null);
      });
  }

  public get userInfo(): IUser {
    return JSON.parse(localStorage.getItem(AuthService.USER_STORAGE_KEY));
  }

  public get userInfo$(): Observable<IUser> {
    return this._userInfo$;
  }
}
