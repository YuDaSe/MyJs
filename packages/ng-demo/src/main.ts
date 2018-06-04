import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const meta = document.querySelector('meta[name="static-base-url"]');

const baseUrl = meta ? meta.getAttribute('content') : '/static/';
const dataWebpackHost = meta ? meta.getAttribute('data-webpack-host') : null;

let webpackHost = 'http://lh.atiim.com';

if (dataWebpackHost && dataWebpackHost !== 'None') {
  webpackHost = dataWebpackHost;
}

declare let __webpack_public_path__;

if (environment.production) {
  __webpack_public_path__ = `${baseUrl}js/`;
  enableProdMode();
} else {
  __webpack_public_path__ = `${webpackHost}:4200/`;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
