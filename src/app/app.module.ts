import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import 'hammerjs';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { reducer, State, authSelectors } from './app.reducer';
import * as authStorage from './core/auth/auth.storage';
import { AuthEffects } from './core/auth/auth.effects';
import { CoursesEffects } from './courses/courses.effects';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [];

const initialState = {
  auth: authStorage.retrieve(),
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.provideStore(reducer, initialState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    CoreModule,
    SharedModule.forRoot(),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ],
})
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    public store: Store<State>,
  ) {
    this.store.subscribe((state) => {
      authStorage.store(state.auth);
    });
  }
}
