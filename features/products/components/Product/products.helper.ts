export const PRODUCT_STATUS_CLASSES: Record<ProductStatus, string> = {
  [ProductStatus.AVAILABLE]:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  [ProductStatus.SOLD]:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  [ProductStatus.RENTED]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};
