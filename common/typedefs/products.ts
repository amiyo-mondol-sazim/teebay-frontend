/**
 * Product-related type definitions
 */

export type TCreateProductInput = {
  title: string;
  description: string;
  categories: string[];
  purchasePrice: number;
  rentPrice: number;
  rentalPeriod: "DAY" | "WEEK" | "MONTH";
};
