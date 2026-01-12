import type { TOfferQueryStatus } from './api';

export type TOffersQueryParams = {
  page: number;
  per_page: number;
  status?: TOfferQueryStatus;
};

export type TBrandsQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
};
