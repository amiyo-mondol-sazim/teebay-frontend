import type { TOffer } from '~/common/typedefs/api';
import { ECurrency } from '~/common/typedefs/enums';

export function getOfferStats({ metrics, status, budget_limit }: TOffer) {
  const shouldShowMetrics = ['active', 'expired', 'completed'].includes(status ?? '');
  return [
    {
      label: 'Revenue Generated',
      value: shouldShowMetrics ? metrics?.revenue_generated?.toLocaleString() : undefined,
      currency: ECurrency.AED,
    },
    {
      label: 'Users Acquired',
      value: shouldShowMetrics ? metrics?.redemptions_count?.toLocaleString() : undefined,
    },
    {
      label: 'Budget Used',
      value: shouldShowMetrics ? metrics?.budget_used?.toLocaleString() : undefined,
      currency: ECurrency.AED,
    },
    {
      label: shouldShowMetrics ? 'Budget Allocated' : 'Budget Proposed',
      value: budget_limit?.toLocaleString(),
      currency: ECurrency.AED,
    },
  ];
}

export const offerStatusMap: Record<NonNullable<TOffer['status']>, { label: string; cssClass: string }> = {
  active: {
    label: 'Live',
    cssClass: 'bg-primary text-primary-foreground',
  },
  draft: {
    label: 'Draft',
    cssClass: 'bg-gray-200 text-primary-foreground',
  },
  pending_approval: {
    label: 'Under Review',
    cssClass: 'bg-warning-300 text-primary-foreground',
  },
  completed: {
    label: 'Expired',
    cssClass: 'bg-gray-200 text-primary-foreground',
  },
  rejected: {
    label: 'Expired',
    cssClass: 'bg-gray-200 text-primary-foreground',
  },
};
