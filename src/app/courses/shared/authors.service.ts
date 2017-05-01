import { Injectable, Inject } from '@angular/core';
import { ResponseContentType, RequestOptionsArgs, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';

import { API_URL } from './../../app.constants';
import { IAuthor } from './author.entity';

interface IAuthorsOperation extends Function {
  (courses: IAuthor[]): IAuthor[];
}

@Injectable()
export class AuthorsService {
  private _authors$: Observable<IAuthor[]>;
  private _updates$: BehaviorSubject<any> = new BehaviorSubject<any>((i) => i);
  private _authorsEndpoint: string = 'authors';

  constructor(
    @Inject(API_URL) private API_URL: string,
    private http: Http,
  ) {
    this._authors$ = this._updates$
      .scan((authors: IAuthor[], operation: IAuthorsOperation) => {
        return operation(authors);
      }, [])
      .publishReplay(1)
      .refCount();
  }

  public get authors$(): Observable<IAuthor[]> {
    return this._authors$;
  }

  public fetchAuthors$(): Observable<any> {
    return this.http.get(this.API_URL + this._authorsEndpoint)
      .map((response) => response.json())
      .map(this.mapDtoToModel)
      .do((courses: IAuthor[]) => {
        this._updates$.next((_) => courses);
      });
  }

  private mapDtoToModel(authors: IAuthor[]): IAuthor[] {
    return authors;
  }
}
