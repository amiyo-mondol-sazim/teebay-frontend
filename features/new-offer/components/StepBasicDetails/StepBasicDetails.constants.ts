import { ECasbackType, ECurrency } from '~/common/typedefs/enums';

export const CASHBACK_TYPE_OPTIONS = [
  { label: 'Fixed', value: ECasbackType.FIXED, icon: 'ph:money-wavy' },
  { label: 'Percentage', value: ECasbackType.PERCENTAGE, icon: 'ph:seal-percent' },
];

export const CURRENCY_OPTIONS = [{ label: 'AED', value: ECurrency.AED }];
