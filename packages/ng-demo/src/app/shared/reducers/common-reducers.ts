import { CommonAction } from '../models/common-action';
import { BaseDataState, BasePaginatedDataState } from '../models/base-data-state';

export const initialBaseDataState: BaseDataState = {
  working: false,
  httpErrorResponse: null,
};

export const defaultPageSize = 10;

export const initialBasePaginatedDataState: BasePaginatedDataState = {
  ...initialBaseDataState,
  pagination: {
    offset: 0,
    pageSize: defaultPageSize,
  },
};

export function initLoadReducer<T>(state, action: CommonAction): T {
  return {
    ...state,
    working: true,
    httpErrorResponse: null,
  };
}

export function apiErrorReducer<T>(state, action: CommonAction): T {
  return {
    ...state,
    working: false,
    httpErrorResponse: action.payload,
  };
}
