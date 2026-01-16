export const rentKeys = {
  all: ["rents"],
  borrows: (userId: number) => [...rentKeys.all, "borrows", userId],
  lents: (userId: number) => [...rentKeys.all, "lents", userId],
  products: (productId: number) => [...rentKeys.all, "products", productId],
};
