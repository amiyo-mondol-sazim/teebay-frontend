
export const SALES_TAB_CONFIG = [
  { value: ESalesTab.BOUGHT, label: "Bought", icon: "ph:shopping-cart" },
  { value: ESalesTab.SOLD, label: "Sold", icon: "ph:currency-dollar" },
];

export const SALES_EMPTY_STATE_CONFIG = {
  [ESalesTab.BOUGHT]: {
    icon: "ph:shopping-cart",
    title: "No bought items yet",
    description: "Start shopping",
  },
  [ESalesTab.SOLD]: {
    icon: "ph:currency-dollar",
    title: "No sold items yet",
    description: "Make your first sale",
  },
} as const;
