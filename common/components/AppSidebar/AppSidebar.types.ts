export type AppNavItem = {
  name: string;
  path: string;
  icon: string;
};

export type AppSidebarProps = {
  navItems: AppNavItem[];
};
