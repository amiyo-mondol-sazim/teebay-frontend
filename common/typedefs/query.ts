import type { components, operations } from "./api-schema";
export type TQueryParams = Record<
  string,
  string | number | boolean | undefined
>;
export type TGetProductsQuery = operations["getAll"]["parameters"]["query"];
export type TGetProductsResponse =
  operations["getAll"]["responses"]["200"]["content"]["application/json"];
export type RentsListResponse = components["schemas"]["RentsListResponse"];
