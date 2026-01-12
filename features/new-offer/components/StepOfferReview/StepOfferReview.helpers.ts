import { ECasbackType } from '~/common/typedefs/enums';
import type { TOfferForm } from '../NewOfferForm/NewOfferForm.helpers';

export const getReviewData = (formValues: Partial<TOfferForm>) => {
  const startDate = formValues.date_range?.start_date ? formatDate(formValues.date_range.start_date) : '-';
  const endDate = formValues.date_range?.end_date ? formatDate(formValues.date_range.end_date) : '-';

  return [
    {
      label: 'Offer Name',
      value: formValues.name || '-',
    },
    {
      label: 'Offer Description',
      value: formValues.description || '-',
    },
    {
      label: 'Start Date',
      value: startDate,
    },
    {
      label: 'End Date',
      value: endDate,
    },
    {
      label: 'Cashback Type',
      value: formValues.cashback?.type === ECasbackType.FIXED ? 'Fixed Amount' : 'Percentage',
    },
    ...(formValues.cashback?.type === ECasbackType.FIXED
      ? [
          {
            label: 'Cashback Amount',
            value: formValues.cashback?.total_budget ? formatCurrency(formValues.cashback.total_budget) : '-',
          },
          {
            label: 'Minimum Transaction Value',
            value: formValues.cashback?.minimum_transaction_value
              ? formatCurrency(formValues.cashback.minimum_transaction_value)
              : '-',
          },
        ]
      : [
          {
            label: 'Cashback Percentage',
            value: `${formValues.cashback?.percentage || 0}%`,
          },
          {
            label: 'Maximum Cashback',
            value: formValues.cashback?.maximum_amount ? formatCurrency(formValues.cashback.maximum_amount) : '-',
          },
        ]),
    {
      label: 'Terms & Conditons',
      value: formValues.terms_and_conditions || '-',
    },
  ];
};
