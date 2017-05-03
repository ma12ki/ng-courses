import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Http,
  Headers,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthorizedHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  public request(url: string | Request, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.request(url, options);
  }

  public get(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.get(url, options);
  }

  public post(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.post(url, body, options);
  }

  public put(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.put(url, body, options);
  }

  public delete(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.delete(url, options);
  }

  public patch(url: string, body: any, options: RequestOptionsArgs = {}): Observable<Response> {
    options = this.addAuthToken(options);
    return super.patch(url, body, options);
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
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!options.headers) {
      options.headers = new Headers();
    }
    options.headers.set('Authorization', `Bearer ${token}`);
    return options;
  }
}
