export type TCreateProductInput = {
  title: string;
  description: string;
  categories: string[];
  purchasePrice: number;
  rentPrice: number;
  rentalPeriod: "DAY" | "WEEK" | "MONTH";
};

export type TUpdateProductInput = {
  title: string;
  description: string;
  categories: string[];
  purchasePrice: number;
  rentPrice: number;
  rentalPeriod: "DAY" | "WEEK" | "MONTH";
};
