import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import * as decode from 'jwt-decode';

import { API_URL } from './../../app.constants';
import { IUser, IUserAndToken, IUserCredentials } from '../../shared/user.entity';

@Injectable()
export class AuthService {
  private _loginEndpoint: string = 'login';
  private _usersEndpoint: string = 'users';

  constructor(
    @Inject(API_URL) private API_URL: string,
    private http: Http,
  ) { }

  public login(credentials: IUserCredentials): Observable<IUserAndToken> {
    const options: RequestOptionsArgs = {
      responseType: ResponseContentType.Json,
    };

    const ret: IUserAndToken = {
      user: null,
      token: null,
    };

    return this.http.get(`${this.API_URL}${this._loginEndpoint}`, options)
      .map((response) => response.json())
      .switchMap(({ token }) => {
        ret.token = token;
        const { id } = decode(token);
        return this.http.get(`${this.API_URL}${this._usersEndpoint}/${id}`, options);
      })
      .map((response) => response.json())
      .map((user: IUser) => {
        ret.user = user;
        return ret;
      });
  }
}
