import { IUser, IUserCredentials } from '../../shared/user.entity';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Rx';

import {
    LoginErrorAction,
    LoginStartAction,
    LoginSuccessAction,
    LogoutErrorAction,
    LogoutStartAction,
    LogoutSuccessAction,
} from './auth.actions';
import { LoaderService } from '../../shared/loader';
import { AuthService } from './auth.service';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let mockAuthService;
  let mockLoaderService;
  let mockRouter;

  let runner: EffectsRunner;
  let authEffects: AuthEffects;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('mockAuthService', ['login']);
    mockLoaderService = jasmine.createSpyObj('mockLoaderService', ['show', 'hide']);
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigateByUrl']);
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AuthEffects,
      {
        provide: AuthService,
        useValue: mockAuthService,
      },
      {
        provide: LoaderService,
        useValue: mockLoaderService,
      },
      {
        provide: Router,
        useValue: mockRouter,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    authEffects = TestBed.get(AuthEffects);
  });

  describe('login$', () => {
    const userCredentials: IUserCredentials = {
      login: 'Leeloo',
      password: 'multipass',
    };
    const loginStartAction = new LoginStartAction(userCredentials);

    describe('when login succeeds', () => {
      const loginResult = {
        user: {} as IUser,
        token: 'ah, success!',
      };

      beforeEach(() => {
        mockAuthService.login.and.returnValue(Observable.of(loginResult));
      });

      it('calls auth service with credentials from payload', (done) => {
        const expected = userCredentials;

        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockAuthService.login).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('redirects to main page', (done) => {
        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
          done();
        });
      });

      it('emits login success action', (done) => {
        const expected = new LoginSuccessAction(loginResult);

        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

    describe('when login fails', () => {
      const loginError = 'oh noez!';

      beforeEach(() => {
        mockAuthService.login.and.returnValue(Observable.throw(loginError));
      });

      it('calls auth service with credentials from payload', (done) => {
        const expected = userCredentials;

        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockAuthService.login).toHaveBeenCalledWith(expected);
          done();
        });
      });

      it('shows and hides loader', (done) => {
        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('does not redirect anywhere', (done) => {
        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
          done();
        });
      });

      it('emits login error action', (done) => {
        const expected = new LoginErrorAction(loginError);

        runner.queue(loginStartAction);

        authEffects.login$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });
  });

  describe('logout$', () => {
    const logoutStartAction = new LogoutStartAction();

    describe('when logout succeeds', () => {
      it('shows and hides loader', (done) => {
        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('redirects to login page', (done) => {
        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
          done();
        });
      });

      it('emits logout success action', (done) => {
        const expected = new LogoutSuccessAction();

        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

    describe('when logout fails', () => {
      const logoutError = new Error('sad faec :(');

      beforeEach(() => {
        mockLoaderService.show.and.throwError(logoutError);
      });

      it('shows and hides loader', (done) => {
        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(mockLoaderService.show).toHaveBeenCalled();
          expect(mockLoaderService.hide).toHaveBeenCalled();
          done();
        });
      });

      it('does not redirect anywhere', (done) => {
        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
          done();
        });
      });

      it('emits logout error action', (done) => {
        const expected = new LogoutErrorAction(logoutError);

        runner.queue(logoutStartAction);

        authEffects.logout$.subscribe((result) => {
          expect(result).toEqual(expected);
          done();
        });
      });
    });

  });
});
