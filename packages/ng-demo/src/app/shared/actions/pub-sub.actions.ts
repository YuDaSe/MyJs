import { CommonAction } from '../../shared/models/common-action';

export const MESSAGE = '[PubSub] MESSAGE';

export class Message implements CommonAction {
  readonly type = MESSAGE;
  constructor(public payload: any) { }
}
