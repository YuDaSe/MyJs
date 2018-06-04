import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routing';
import { reducers, metaReducers } from './reducers';
import { CustomRouterStateSerializer } from './shared/utils/route-utils';
import { SharedModule } from './shared/shared.module';
import { ProxyOutletComponent } from './shared/components/proxy-outlet/proxy-outlet.component';

// custom boostrapper
const bootstrapRootComponent = (app, selector, component) => {
  // check root element existance
  if (window.document.querySelector(selector)) {
    app.bootstrap(component);
  }
};
// components registry selector: component
const entryComponentsRegistry = {
  'ng-app': ProxyOutletComponent,
};

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules }),
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule,
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ? StoreDevtoolsModule : [],
    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
  // bootstrap: [AppComponent],
  entryComponents: [
  ],
  declarations: [
  ],
})
export class AppModule {
  ngDoBootstrap(app) {

    for (const selector in entryComponentsRegistry) {
      bootstrapRootComponent(app, selector, entryComponentsRegistry[selector]);
    }
  }
}
