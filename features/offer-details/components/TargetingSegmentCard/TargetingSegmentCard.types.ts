import type { TOfferRule } from '~/common/typedefs/api';
import type { ECurrency } from '~/common/typedefs/enums';

export type TSummarySegment = {
  text: string;
  className?: string;
};

export type TTargetingSegmentCardProps = {
  index: number;
  tenantId?: number;
  rule: TOfferRule;
  currency: ECurrency;
};
