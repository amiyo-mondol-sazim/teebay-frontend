import type { components } from "./api-schema";

export type TUser = components["schemas"]["TokenizedUser"];

export interface IInsight {
  change: number;
  changeLabel: string;
  currency?: string;
  isPositive: boolean;
  label: string;
  value: number;
}
