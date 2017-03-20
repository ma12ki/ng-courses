import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';
import 'rxjs';
import * as faker from 'Faker';

import { IUser } from '../entities/user';

@Injectable()
export class AuthService {
  private static TOKEN_STORAGE_KEY = 'AUTH_TOKEN';
  private static USER_STORAGE_KEY = 'AUTH_USER';
  private hasToken: boolean;
  private hasToken$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.hasToken = !!localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
    this.hasToken$.next(this.hasToken);
  }

  public isAuthenticated(): boolean {
    return this.hasToken;
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.hasToken$;
  }

  public login(login: string, password: string): void {
    localStorage.setItem(AuthService.USER_STORAGE_KEY, JSON.stringify({ login }));
    localStorage.setItem(AuthService.TOKEN_STORAGE_KEY, faker.Company.bs());
    this.hasToken = true;
    this.hasToken$.next(this.hasToken);
    console.info('successfully logged in!');
  }

  public logout(): void {
    localStorage.removeItem(AuthService.USER_STORAGE_KEY);
    localStorage.removeItem(AuthService.TOKEN_STORAGE_KEY);
    this.hasToken = false;
    this.hasToken$.next(this.hasToken);
    console.info('successfully logged out!');
  }

  public getUserInfo(): IUser {
    return JSON.parse(localStorage.getItem(AuthService.USER_STORAGE_KEY));
  }
}
