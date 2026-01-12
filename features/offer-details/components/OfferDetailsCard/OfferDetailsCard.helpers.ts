import type { TOfferDetails } from '~/common/typedefs/api';
import { ECurrency } from '~/common/typedefs/enums';

export const offerStatusMap: Record<NonNullable<TOfferDetails['status']>, { label: string; cssClass: string }> = {
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
    label: 'Rejected',
    cssClass: 'bg-error-25 text-error',
  },
};

export function getOfferStats(offer: TOfferDetails) {
  const isActiveOrExpired = ['active', 'expired', 'completed'].includes(offer.status ?? '');

  return [
    {
      label: 'Revenue Generated',
      value: isActiveOrExpired ? offer.metrics?.revenue_generated?.toLocaleString() : '-',
      currency: isActiveOrExpired ? ECurrency.AED : undefined,
    },
    {
      label: 'Users Acquired',
      value: isActiveOrExpired ? offer.metrics?.redemptions_count?.toLocaleString() : '-',
    },
    {
      label: 'Budget Used',
      value: isActiveOrExpired ? offer.metrics?.budget_used?.toLocaleString() : '-',
    },
    {
      label: isActiveOrExpired ? 'Budget Allocated' : 'Budget Proposed',
      value: offer.budget_limit?.toLocaleString() ?? '-',
      currency: offer.budget_limit ? ECurrency.AED : undefined,
    },
  ];
}
