import { HttpErrorResponse } from '@angular/common/http';

export interface BaseDataState {
  working: boolean;
  httpErrorResponse: HttpErrorResponse;
}

export interface Pagination {
  offset: number;
  pageSize: number;
}

export interface BasePaginatedDataState extends BaseDataState {
  pagination: Pagination;
}
