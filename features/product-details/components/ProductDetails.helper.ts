export const isProductSoldOrOwned = (
  productStatus: string,
  isOwnProduct: boolean,
): boolean => {
  return productStatus === EProductStatus.SOLD || isOwnProduct;
};
