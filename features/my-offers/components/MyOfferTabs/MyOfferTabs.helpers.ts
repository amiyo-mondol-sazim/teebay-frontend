import type { TOfferQueryStatus } from '~/common/typedefs/api';

export const offerTabs: Array<{
  label: string;
  value: TOfferQueryStatus;
  count: number;
  tabClass: string;
  hideIcon?: boolean;
}> = [
  {
    label: 'Live Offers',
    value: 'active',
    count: 10,
    tabClass:
      'data-[state=active]:bg-primary-25 data-[state=active]:text-primary-400 data-[state=active]:border-primary-25',
  },
  {
    label: 'Under Review',
    value: 'pending_approval',
    count: 2,
    tabClass:
      'data-[state=active]:bg-warning-50 data-[state=active]:text-warning-400 data-[state=active]:border-warning-50',
  },
  {
    label: 'Expired',
    value: 'expired',
    count: 3,
    tabClass: 'data-[state=active]:bg-gray-30 data-[state=active]:text-gray-900 data-[state=active]:border-gray-30',
  },
  {
    label: 'Drafts',
    value: 'draft',
    count: 1,
    tabClass:
      'ml-auto data-[state=active]:bg-gray-30 data-[state=active]:text-gray-900 data-[state=active]:border-gray-30',
    hideIcon: true,
  },
];
