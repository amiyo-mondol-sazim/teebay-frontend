export type TAppNavItem = {
  name: string;
  path: string;
  icon: string;
};

export type TAppSidebarProps = {
  navItems: TAppNavItem[];
};
