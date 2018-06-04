import { Action } from '@ngrx/store';

export interface CommonAction extends Action {
  payload?: any;
}
