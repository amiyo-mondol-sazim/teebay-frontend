import type { TOfferDetails } from '~/common/typedefs/api';

export const getBasicDetails = (offer: TOfferDetails): Array<{ label: string; value: string }> => [
  {
    label: 'Offer ID',
    value: offer.id?.toString() ?? '-',
  },
  {
    label: 'Offer Name',
    value: offer.name ?? '-',
  },
  {
    label: 'Offer Description',
    value: offer.description ?? '-',
  },
  {
    label: 'Start Date',
    value: offer.start_date ? formatDate(offer.start_date, 'dd MMM yyyy', true) : '-',
  },
  {
    label: 'End Date',
    value: offer.end_date ? formatDate(offer.end_date, 'dd MMM yyyy', true) : '-',
  },
  ...getCashbackDetails(offer),
  {
    label: 'Total Offer Budget',
    value: offer.budget_limit ? formatCurrency(offer.budget_limit) : '-',
  },
  {
    label: 'Terms and Conditions',
    value: offer.terms_and_conditions ?? '-',
  },
];

function getCashbackDetails(offer: Pick<TOfferDetails, 'cashback_rule'>): Array<{ label: string; value: string }> {
  const cashbackItems = [{ label: 'Cashback Type', value: offer.cashback_rule?.cashback_type ?? '-' }];
  if (!offer.cashback_rule?.cashback_config) return cashbackItems;
  const { cashback_type, cashback_config } = offer.cashback_rule;

  if (cashback_type === 'fixed' && 'cashback_amount' in cashback_config) {
    cashbackItems.push(
      {
        label: 'Cashback Amount',
        value: formatCurrency(cashback_config.cashback_amount),
      },
      {
        label: 'Minimum Transaction Value',
        value: formatCurrency(cashback_config.minimum_transaction_value),
      },
    );
    return cashbackItems;
  }
  if (cashback_type === 'percentage' && 'cashback_percentage' in cashback_config) {
    cashbackItems.push(
      {
        label: 'Cashback Percentage',
        value: `${cashback_config.cashback_percentage}%`,
      },
      {
        label: 'Maximum Cashback Value',
        value: formatCurrency(cashback_config.maximum_cashback_value),
      },
    );
    return cashbackItems;
  }
  return cashbackItems;
}
