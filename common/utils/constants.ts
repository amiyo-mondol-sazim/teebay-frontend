export const PAGE_URLS = {
  HOME: "/",
  LOGIN: "/auth/login",
  MY_PRODUCTS: "/my-products",
  ADD_PRODUCTS: "/add-product",
  SALES: "/sales",
  RENTS: "/rents",
  CONVERSATIONS: "/conversations",
  NOTIFICATIONS: "/notifications",
};

export const DEFAULT_OFFER_IMAGE_URL = "/images/offer-placeholder.svg";

export const MEGABYTE = 1024 * 1024;

export const ACCESS_TOKEN_STORAGE_KEY = "access_token";

export const AVAILABLE_CATEGORIES = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home",
  "Toys",
  "Music",
  "Games",
  "Other",
] as const;

export enum EProductStatusFilter {
  ALL = "ALL",
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  SOLD = "SOLD",
}

export const STATUS_LABELS: Record<EProductStatusFilter, string> = {
  [EProductStatusFilter.ALL]: "All",
  [EProductStatusFilter.AVAILABLE]: "Available",
  [EProductStatusFilter.RENTED]: "Rented",
  [EProductStatusFilter.SOLD]: "Sold",
};
