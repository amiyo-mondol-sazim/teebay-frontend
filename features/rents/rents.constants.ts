export const RENTS_TAB_CONFIG = [
  { value: ERentsTab.BORROWS, label: "Borrows", icon: "ph:hand-bag" },
  { value: ERentsTab.LENTS, label: "Lents", icon: "ph:house" },
];

export const RENTS_EMPTY_STATE_CONFIG = {
  [ERentsTab.BORROWS]: {
    icon: "ph:hand-bag",
    title: "No borrows yet",
    description: "Browse products to rent",
  },
  [ERentsTab.LENTS]: {
    icon: "ph:house",
    title: "No lents yet",
    description: "List your items for rent",
  },
} as const;
