export interface IKPICardProps {
  label: string;
  value: string | number;
  currency?: string;
  change?: number;
  changeLabel?: string;
  isPositive?: boolean;
}
