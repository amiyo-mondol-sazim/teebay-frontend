import dayjs from "dayjs";

export const FORMAT_CREATED_DATE = (dateString: string): string => {
  return dayjs(dateString).format("MMM DD, YYYY");
};

export const IS_ACTION_BUTTON_DISABLED = (
  productStatus: string,
  isOwnProduct: boolean,
): boolean => {
  return productStatus === EProductStatus.SOLD || isOwnProduct;
};
