import type { components } from "./api-schema";

export type TUser = components["schemas"]["TokenizedUser"];

/**
 * Legacy Mock API types
 */

export interface IInsight {
  /** Change of the insight */
  change: number;
  /** Change label of the insight */
  changeLabel: string;
  /** Currency of the insight */
  currency?: string;
  /** Whether the change is positive */
  isPositive: boolean;
  /** Label of the insight */
  label: string;
  /** Value of the insight */
  value: number;
}
