// tslint:disable max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PubsubService } from './services/pubsub.service';
import { StoreBridgeService } from './services/store-bridge.service';
import { ProxyOutletComponent } from './components/proxy-outlet/proxy-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ProxyOutletComponent,
  ],
  declarations: [
    ProxyOutletComponent,
  ],
  providers: [
    PubsubService,
    StoreBridgeService,
  ],
})
export class SharedModule {
  constructor() {}
}
