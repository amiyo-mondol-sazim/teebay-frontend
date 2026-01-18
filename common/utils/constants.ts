export const PAGE_URLS = {
  HOME: "/",
  LOGIN: "/auth/login",
  MY_PRODUCTS: "/my-products",
  ADD_PRODUCTS: "/add-product",
  SALES: "/sales",
  RENTS: "/rents",
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

export const STATUS_LABELS: Record<TProductStatus, string> = {
  AVAILABLE: "Available",
  RENTED: "Rented",
  SOLD: "Sold",
};
