import type { operations } from "./api-schema";
export type TQueryParams = Record<
  string,
  string | number | boolean | undefined
>;
export type TGetProductsQuery = operations["getAll"]["parameters"]["query"];
export type TGetProductsResponse =
  operations["getAll"]["responses"]["200"]["content"]["application/json"];
export type TTransactionResponse = TSaleResponse | TRentResponse;
export type TTransactionType = "sale" | "rent";
