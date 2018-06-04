import { Injectable } from '@angular/core';

declare var PubSub: any;

@Injectable()
export class PubsubService {
  public instance: any = null;

  constructor() {
    this.instance = PubSub;
  }
}
