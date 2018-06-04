import { Routes } from '@angular/router';
import { ProxyOutletComponent } from './shared/components/proxy-outlet/proxy-outlet.component';
// tslint:enable:max-line-length

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [
    ],
  },
  {
    path: '**',
    component: ProxyOutletComponent,
  },
];
