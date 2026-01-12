import { faker } from '@faker-js/faker';
import type { TOfferDetails } from '~/common/typedefs/api';

export const generateOffers = (
  count: number,
  props?: {
    status?: TOfferDetails['status'];
    cashback_type?: 'fixed' | 'percentage';
    merchant_id?: TOfferDetails['merchant_id'];
  },
): TOfferDetails[] => {
  const status: TOfferDetails['status'] =
    props?.status || faker.helpers.arrayElement(['draft', 'pending_approval', 'active', 'completed', 'rejected']);

  const cashback_type: 'fixed' | 'percentage' =
    props?.cashback_type || faker.helpers.arrayElement(['fixed', 'percentage']);
  const cashback_rule: TOfferDetails['cashback_rule'] = {
    cashback_type,
    cashback_config:
      cashback_type === 'fixed'
        ? {
            cashback_amount: faker.number.int({ min: 100, max: 1000 }),
            minimum_transaction_value: faker.number.int({ min: 100, max: 1000 }),
          }
        : cashback_type === 'percentage'
          ? {
              cashback_percentage: faker.number.int({ min: 1, max: 100 }),
              maximum_cashback_value: faker.number.int({ min: 100, max: 1000 }),
            }
          : [],
  };

  const shouldHaveInsight = status === 'active' || status === 'completed';
  const budget_limit = faker.number.int({ min: 100_000, max: 1_000_000 });
  return Array.from({ length: count }, (_, index) => {
    // Generate unique start and end dates for each offer
    const offerStartDate = faker.date.recent().toISOString();
    const offerEndDate = faker.date.soon({ refDate: offerStartDate }).toISOString();

    return {
      id: index + 1,
      merchant_id: props?.merchant_id || index + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      customer_usage_limit: faker.number.int({ min: 1, max: 10 }),
      status,
      start_date: offerStartDate,
      end_date: offerEndDate,
      offer_attachments: [
        {
          id: index * 3,
          image_filename: `offer-cover-photo-${(index % 3) + 1}.png`,
          image_url: `/demo/offer-cover-photo-${(index % 3) + 1}.png`,
          image_content_type: 'image/png',
          attachment_type: 'promotional',
          image_byte_size: faker.number.int({ min: 100, max: 1000 }),
        },
        {
          id: index * 3 + 1,
          image_filename: `offer-cover-photo-${((index + 1) % 3) + 1}.png`,
          image_url: `/demo/offer-cover-photo-${((index + 1) % 3) + 1}.png`,
          image_content_type: 'image/png',
          attachment_type: 'banner',
          image_byte_size: faker.number.int({ min: 100, max: 1000 }),
        },
        {
          id: index * 3 + 2,
          image_filename: 'merchant-company-logo.png',
          image_url: `/demo/merchant-company-logo.png`,
          image_content_type: 'image/png',
          attachment_type: 'logo',
          image_byte_size: faker.number.int({ min: 100, max: 1000 }),
        },
      ],
      banner_image_url: '/demo/offer-cover-photo-1.png',
      bank_logo_url: '/demo/adib-bank-logo.png',
      bank_id: 'bank-001',
      bank_name: 'Abu Dhabi Islamic Bank',
      cashback_rule,
      currency: 'AED',
      budget_limit,
      terms_and_conditions: faker.lorem.paragraph(),
      rules: [],
      created_at: faker.date.recent().toISOString(),
      updated_at: faker.date.recent().toISOString(),

      impressions: shouldHaveInsight ? faker.number.int({ min: 0, max: 1000 }) : undefined,
      revenue_generated: shouldHaveInsight
        ? faker.number.int({ min: status === 'completed' ? budget_limit : 0, max: 100000 })
        : undefined,
      users_acquired: shouldHaveInsight ? faker.number.int({ min: 0, max: 1000 }) : undefined,
    };
  });
};
