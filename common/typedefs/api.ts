import type { components, paths } from './api-schema';

export type TUser = components['schemas']['MerchantUser'];
export type TOffer = components['schemas']['OfferList'];
export type TOfferAttachment = components['schemas']['OfferAttachment'];
export type TOfferStatus = TOffer['status'];
export type TOfferQueryStatus = NonNullable<
  NonNullable<paths['/api/v1/merchant/offers']['get']['parameters']['query']>['status']
>;
export type TOfferDetails = components['schemas']['Offer'];
export type TOfferRule = NonNullable<components['schemas']['OfferRule']>;
export type TCreateOffer = components['schemas']['CreateOffer'];
export type TUpdateOffer = paths['/api/v1/merchant/offers/{id}']['put']['requestBody']['content']['application/json'];
export type TTenantsQueryParams = NonNullable<paths['/api/v1/merchant/tenants']['get']['parameters']['query']>;

export type TRuleTargetUserCountPayload =
  paths['/api/v1/merchant/rule_target_count']['post']['requestBody']['content']['application/json'];
export type TCashbackRuleConfig = components['schemas']['CashbackRuleConfig'];
export type TFixedCashbackConfig = Extract<TCashbackRuleConfig, { cashback_amount: number }>;
export type TPercentageCashbackConfig = Extract<TCashbackRuleConfig, { cashback_percentage: number }>;

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
