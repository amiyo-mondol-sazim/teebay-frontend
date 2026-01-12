import { ERangeCondition, ERuleTarget, type ECurrency } from '~/common/typedefs/enums';
import type { SummarySegment, TPartialOfferRule, TRuleOption } from './RuleSummary.types';

const getRangeCondition = (min?: number | null, max?: number | null): ERangeCondition => {
  if (min != null && max != null) return ERangeCondition.BETWEEN;
  if (min != null) return ERangeCondition.MORE_THAN;
  if (max != null) return ERangeCondition.LESS_THAN;
  return ERangeCondition.BETWEEN;
};

const formatAmountSpentText = (currency: ECurrency, min?: number | null, max?: number | null): SummarySegment[] => {
  const amountTextSegments: SummarySegment[] = [{ text: 'Amount Spent ' }];

  switch (getRangeCondition(min, max)) {
    case ERangeCondition.MORE_THAN:
      amountTextSegments.push(
        { text: 'is more than ' },
        { text: formatCurrency(min ?? 0, currency), className: 'font-medium' },
      );
      break;
    case ERangeCondition.LESS_THAN:
      amountTextSegments.push(
        { text: 'is less than ' },
        { text: formatCurrency(max ?? 0, currency), className: 'font-medium' },
      );
      break;
    case ERangeCondition.BETWEEN:
      amountTextSegments.push(
        { text: 'is between ' },
        { text: formatCurrency(min ?? 0, currency), className: 'font-medium' },
        { text: ' and ' },
        { text: formatCurrency(max ?? 0, currency), className: 'font-medium' },
      );
      break;
  }

  return amountTextSegments;
};

const formatTransactionCountText = (min?: number | null, max?: number | null): SummarySegment[] => {
  const countTextSegments: SummarySegment[] = [{ text: 'Transaction Count ' }];

  switch (getRangeCondition(min, max)) {
    case ERangeCondition.MORE_THAN:
      countTextSegments.push({ text: 'is more than ' }, { text: formatNumber(min || 0), className: 'font-medium' });
      break;
    case ERangeCondition.LESS_THAN:
      countTextSegments.push({ text: 'is less than ' }, { text: formatNumber(max || 0), className: 'font-medium' });
      break;
    case ERangeCondition.BETWEEN:
      countTextSegments.push(
        { text: 'is between ' },
        { text: formatNumber(min || 0), className: 'font-medium' },
        { text: ' and ' },
        { text: formatNumber(max || 0), className: 'font-medium' },
      );
      break;
  }

  return countTextSegments;
};

const formatBrandNames = (brands: TRuleOption[]): SummarySegment[] => {
  const brandNames = brands.map((brand) => brand.name);
  if (brandNames.length === 0) return [];

  if (brandNames.length > 2) {
    return [{ text: `${brandNames.slice(0, 2).join(', ')} +${brandNames.length - 2} more`, className: 'font-medium' }];
  }
  return [{ text: brandNames.join(', '), className: 'font-medium' }];
};

const formatCategoryText = (category: TRuleOption, subcategory?: TRuleOption): SummarySegment[] => {
  if (!category) return [];

  return [{ text: subcategory ? `${category.name} > ${subcategory.name}` : category.name, className: 'font-medium' }];
};

export const generateRuleSummary = (rule: TPartialOfferRule, currency: ECurrency): SummarySegment[][] => {
  if (!rule) return [];

  const summary: SummarySegment[][] = [];

  if (rule.target === ERuleTarget.BRAND && rule.brands?.length) {
    const brandText = formatBrandNames(rule.brands);
    summary.push([{ text: 'Brands: ' }, ...brandText]);
  } else if (rule.target === ERuleTarget.CATEGORY && rule.category) {
    const categoryText = formatCategoryText(rule.category, rule.subcategory);
    summary.push([{ text: 'Category: ' }, ...categoryText]);
  }

  if (rule.amount_spent?.min != null || rule.amount_spent?.max != null) {
    const amountText = formatAmountSpentText(currency, rule.amount_spent?.min, rule.amount_spent?.max);
    summary.push(amountText);
  }

  if (rule.transaction_count?.min != null || rule.transaction_count?.max != null) {
    const countText = formatTransactionCountText(rule.transaction_count?.min, rule.transaction_count?.max);
    summary.push(countText);
  }

  if (rule.in_last_days) {
    summary.push([
      { text: 'Transacted in the last ' },
      { text: rule.in_last_days.toString(), className: 'font-medium' },
      { text: ' days' },
    ]);
  }

  return summary;
};

export const isRuleValid = (rule: TPartialOfferRule): { isValid: false; errorMessage: string } | { isValid: true } => {
  if (!rule.in_last_days) return { isValid: false, errorMessage: 'Please select the number of days' };
  if (rule.target === ERuleTarget.BRAND && !rule.brands?.length) {
    return { isValid: false, errorMessage: 'Please select target brand(s)' };
  }
  if (rule.target === ERuleTarget.CATEGORY && !rule.category) {
    return { isValid: false, errorMessage: 'Please select a target category' };
  }
  return { isValid: true };
};
