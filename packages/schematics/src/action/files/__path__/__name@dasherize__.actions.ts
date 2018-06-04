import { HttpErrorResponse } from '@angular/common/http';
import { CommonAction } from '../../shared/models/common-action';

export const API_ERROR = '[<%= classify(name) %>] API_ERROR';
export const LOAD = '[<%= classify(name) %>] LOAD';
export const LOADED = '[<%= classify(name) %>] LOADED';

export class APIError implements CommonAction {
  readonly type = API_ERROR;
  constructor(public payload: HttpErrorResponse) { }
}

export class Load implements CommonAction {
  readonly type = LOAD;
  constructor() { }
}

export class Loaded implements CommonAction {
  readonly type = LOADED;
  constructor(public payload: any[]) { }
}