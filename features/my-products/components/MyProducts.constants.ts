export interface TProductStatusFilterOption {
  value: EProductStatusFilter;
  label: string;
  icon: string;
  color: string;
}

export const PRODUCT_STATUS_FILTER_OPTIONS: TProductStatusFilterOption[] = [
  {
    value: EProductStatusFilter.ALL,
    label: "All",
    icon: "ph:squares-four",
    color: "hover:border-primary/50 hover:bg-primary/5",
  },
  {
    value: EProductStatusFilter.AVAILABLE,
    label: "Available",
    icon: "ph:check-circle",
    color: "hover:border-success/50 hover:bg-success/5",
  },
  {
    value: EProductStatusFilter.RENTED,
    label: "Rented",
    icon: "ph:clock",
    color: "hover:border-chart-3/50 hover:bg-chart-3/5",
  },
  {
    value: EProductStatusFilter.SOLD,
    label: "Sold",
    icon: "ph:currency-dollar",
    color: "hover:border-chart-2/50 hover:bg-chart-2/5",
  },
] as const;
