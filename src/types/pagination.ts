import { type Nullable } from ".";

export type Pagination = {
  total: number;
  hasMore: boolean;
  nextPage: Nullable<number>;
  prevPage: Nullable<number>;
};

export type WithPagination<T> = T & { pagination: Pagination };

export type PaginationParams = {
  page?: number;
  limit?: number;
};
