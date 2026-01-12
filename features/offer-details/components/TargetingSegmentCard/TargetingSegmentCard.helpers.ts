import type { TOfferRule } from '~/common/typedefs/api';
import { ERangeCondition, type ECurrency } from '~/common/typedefs/enums';
import type { TSummarySegment } from './TargetingSegmentCard.types';

const getRangeCondition = (min?: number | null, max?: number | null): ERangeCondition => {
  if (min && max) return ERangeCondition.BETWEEN;
  if (min) return ERangeCondition.MORE_THAN;
  if (max) return ERangeCondition.LESS_THAN;
  return ERangeCondition.BETWEEN;
};

const formatAmountSpentText = (currency: ECurrency, min?: number | null, max?: number | null): TSummarySegment[] => {
  const amountTextSegments: TSummarySegment[] = [{ text: 'Amount Spent ' }];

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

const formatTransactionCountText = (min?: number | null, max?: number | null): TSummarySegment[] => {
  const countTextSegments: TSummarySegment[] = [{ text: 'Transaction Count ' }];

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

const formatBrandNames = (brandNames: string[]): TSummarySegment[] => {
  if (brandNames.length === 0) return [];

  if (brandNames.length > 2) {
    return [{ text: `${brandNames.slice(0, 2).join(', ')} +${brandNames.length - 2} more`, className: 'font-medium' }];
  }
  return [{ text: brandNames.join(', '), className: 'font-medium' }];
};

const formatCategoryText = (category: string, subcategory: string | null): TSummarySegment[] => {
  if (!category) return [];
  return [{ text: subcategory ? `${category} > ${subcategory}` : category, className: 'font-medium' }];
};

export const generateRuleSummary = (rule: Partial<TOfferRule>, currency: ECurrency): TSummarySegment[][] => {
  if (!rule) return [];

  const summary: TSummarySegment[][] = [];
  const brands = Object.values(rule.target_brands ?? {});
  const category = Object.values(rule.target_categories ?? {})[0] ?? null;

  const subcategory = Object.values(rule.target_sub_categories ?? {})[0] ?? null;

  if (brands?.length) {
    summary.push([{ text: 'Brands: ' }, ...formatBrandNames(brands)]);
  } else if (category) {
    summary.push([{ text: 'Category: ' }, ...formatCategoryText(category, subcategory)]);
  }

  if (rule.transaction_amount_lower_limit || rule.transaction_amount_upper_limit) {
    const amountText = formatAmountSpentText(
      currency,
      rule.transaction_amount_lower_limit,
      rule.transaction_amount_upper_limit,
    );
    summary.push(amountText);
  }

  if (rule.transaction_count_lower_limit || rule.transaction_count_upper_limit) {
    const countText = formatTransactionCountText(
      rule.transaction_count_lower_limit,
      rule.transaction_count_upper_limit,
    );
    summary.push(countText);
  }

  if (rule.number_of_days) {
    summary.push([
      { text: 'Transacted in the last ' },
      { text: rule.number_of_days.toString(), className: 'font-medium' },
      { text: ' days' },
    ]);
  }

  return summary;
};
