import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth/auth.service';

@Injectable()
export class AuthorizedHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSS');
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.request(url, options);
  }

  public get(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    console.log(url, options);
    options = this.addAuthToken(options);
    return super.get(url, options);
  }

  public post(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.post(url, options);
  }

  public put(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.put(url, options);
  }

  public delete(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.delete(url, options);
  }

  public patch(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.patch(url, options);
  }

  public head(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.head(url, options);
  }

  public options(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.options(url, options);
  }

  private addAuthToken(options: RequestOptionsArgs): RequestOptionsArgs {
    const token = localStorage.getItem(AuthService.TOKEN_STORAGE_KEY);
    options.headers.set('Authorization', `Bearer ${token}`);
    return options;
  }
}
