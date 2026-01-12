export const PAGE_URLS = {
  HOME: '/',
  LOGIN: '/auth/login',
  NEW_OFFER: '/offers/create',
  DRAFT_OFFER: (id: number) => `/offers/create?offerId=${id}`,
  OFFER: (id: number) => `/offers/${id}`,
};

export const DEFAULT_OFFER_IMAGE_URL = '/images/offer-placeholder.svg';

export const MEGABYTE = 1024 * 1024;

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
