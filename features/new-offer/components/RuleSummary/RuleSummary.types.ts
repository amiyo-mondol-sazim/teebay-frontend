import type { ERuleTarget } from '~/common/typedefs/enums';
import type { TOfferTargetingRule } from '../NewOfferForm/NewOfferForm.helpers';

export type SummarySegment = {
  text: string;
  className?: string;
};

export type TRuleOption = {
  id: number;
  name: string;
};

export type TPartialOfferRule = Partial<TOfferTargetingRule> & { target: ERuleTarget };
