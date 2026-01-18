import type { components, operations } from "./api-schema";
export type TQueryParams = Record<
  string,
  string | number | boolean | undefined
>;
export type TGetProductsQuery = operations["getAll"]["parameters"]["query"];
export type TGetProductsResponse =
  operations["getAll"]["responses"]["200"]["content"]["application/json"];
export type TRentsListResponse = components["schemas"]["RentsListResponse"];
export type TProductResponse = components["schemas"]["ProductResponse"];
export type TProductStatus = components["schemas"]["EProductStatus"];
export type TSalesListResponse = components["schemas"]["SalesListResponse"];
export type TSaleResponse = components["schemas"]["SaleResponse"];
