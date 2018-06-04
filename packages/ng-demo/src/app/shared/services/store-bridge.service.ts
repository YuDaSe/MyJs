import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PubsubService } from './pubsub.service';
import * as appReducers from '../../reducers';

@Injectable()
export class StoreBridgeService {

  constructor(
    private pubsub: PubsubService,
    private store: Store<appReducers.State>,
  ) {
    this.pubsub.instance.subscribe('Store::dispatch', (msg, data) => {
      this.store.dispatch(data);
    });
  }
}
