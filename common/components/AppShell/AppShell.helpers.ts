import type { TAppNavItem } from "../AppSidebar/AppSidebar.types";

export const NAV_ITEMS: TAppNavItem[] = [
  {
    name: "Home",
    path: PAGE_URLS.HOME,
    icon: "ph:house-fill",
  },
  {
    name: "My Products",
    path: PAGE_URLS.MY_PRODUCTS,
    icon: "ph:package",
  },
  {
    name: "Add Products",
    path: PAGE_URLS.ADD_PRODUCTS,
    icon: "ph:plus-circle",
  },
  {
    name: "My Sales",
    path: PAGE_URLS.SALES,
    icon: "ph:currency-dollar",
  },
  {
    name: "My Rents",
    path: PAGE_URLS.RENTS,
    icon: "ph:swap",
  },
  {
    name: "Conversations",
    path: PAGE_URLS.CONVERSATIONS,
    icon: "ph:chat-circle-dots",
  },
];
