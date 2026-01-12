import { toTypedSchema } from '@vee-validate/zod';
import { differenceInCalendarDays } from 'date-fns';
import type { FormContext, FormOptions } from 'vee-validate';
import { z } from 'zod';
import type {
  TCreateOffer,
  TFixedCashbackConfig,
  TOfferDetails,
  TPercentageCashbackConfig,
} from '~/common/typedefs/api';
import { EAttachmentType, ECasbackType, ECurrency, ERuleTarget } from '~/common/typedefs/enums';
import type { DeepPaths } from '~/common/typedefs/utils';
import { ENewOfferFormTab } from '../NewOfferFormTabs/NewOfferFormTabs.enums';
import { DECIMAL_PRECISION, MAX_DAYS } from './NewOfferForm.constants';

const decimalSchema = z.number().multipleOf(DECIMAL_PRECISION, 'should not have more than 2 decimal places');
const positiveDecimalSchema = decimalSchema.gt(0, 'Should be more than 0');
const selectedOptionSchema = z.object({ id: z.number(), name: z.string() });

export type TCountRange = NonNullable<z.infer<typeof offerTargetingRuleBaseSchema.shape.amount_spent>>;

const offerTargetingRuleBaseSchema = z.object({
  amount_spent: z
    .object({ min: decimalSchema.min(0).nullish(), max: positiveDecimalSchema.nullish() })
    .nullish()
    .refine((data) => typeof data?.min !== 'number' || typeof data?.max !== 'number' || data.min < data.max, {
      message: 'minimum should be less than maximum',
    }),
  transaction_count: z
    .object({ min: z.number().int().min(0).nullish(), max: z.number().int().gt(0).nullish() })
    .nullish()
    .refine((data) => typeof data?.min !== 'number' || typeof data?.max !== 'number' || data.min < data.max, {
      message: 'minimum should be less than maximum',
    }),
  in_last_days: z.number().int().min(1).max(MAX_DAYS),
});

const offerTargetingRuleSchema = z.discriminatedUnion('target', [
  offerTargetingRuleBaseSchema.extend({
    target: z.literal(ERuleTarget.CATEGORY),
    category: selectedOptionSchema,
    subcategory: selectedOptionSchema.optional(),
  }),
  offerTargetingRuleBaseSchema.extend({
    target: z.literal(ERuleTarget.BRAND),
    brands: z.array(selectedOptionSchema).min(1),
  }),
]);

export type TOfferTargetingRule = z.infer<typeof offerTargetingRuleSchema>;

const dateRangeSchema = z
  .object({
    start_date: z.date().min(new Date(), 'Should be in the future'),
    end_date: z.date().min(new Date(), 'Should be in the future'),
  })
  .superRefine((data, ctx) => {
    if (differenceInCalendarDays(data.end_date, data.start_date) < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Should be at least 1 day after start date',
        path: ['end_date'],
      });
    }
  });

const cashbackSchema = z
  .discriminatedUnion('type', [
    z.object({
      type: z.literal(ECasbackType.FIXED),
      total_budget: positiveDecimalSchema,
      amount: positiveDecimalSchema,
      minimum_transaction_value: positiveDecimalSchema,
    }),
    z.object({
      type: z.literal(ECasbackType.PERCENTAGE),
      total_budget: positiveDecimalSchema,
      percentage: decimalSchema.gt(0, 'Should be more than 0%').lt(100, 'Should not be more than 100%'),
      maximum_amount: positiveDecimalSchema,
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.total_budget < (data.type === ECasbackType.FIXED ? data.amount : data.maximum_amount)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `should be more than${data.type === ECasbackType.FIXED ? '' : ' maximum'} cashback amount`,
        path: ['total_budget'],
      });
    }
  });

export const offerFormSchema = z.object({
  name: z.string().trim().min(1, 'Field is required').max(127, 'Should be less than 127 characters'),
  customer_usage_limit: z.number().int().min(1),
  description: z.string().trim().min(1, 'Field is required').max(300, 'Should be less than 300 characters'),
  date_range: dateRangeSchema,
  tenant: selectedOptionSchema,
  currency: z.nativeEnum(ECurrency),
  terms_and_conditions: z.string().trim().min(1, 'Field is required').max(1024, 'Should be less than 1024 characters'),
  banner_image_url: z.string(),
  promotional_image_url: z.string(),
  company_logo_url: z.string(),
  rules: z
    .array(offerTargetingRuleSchema, { required_error: 'At least one rule is required' })
    .min(1, { message: 'At least one rule is required' }),
  cashback: cashbackSchema,
});

export type TOfferForm = z.infer<typeof offerFormSchema>;

export const formSchema = toTypedSchema(offerFormSchema);

export const defaultRuleValue: Partial<TOfferTargetingRule> = {
  target: ERuleTarget.BRAND,
  brands: [],
  amount_spent: { min: null, max: null },
  transaction_count: { min: null, max: null },
  in_last_days: 90,
};

export const newOfferFormInitialValue: FormOptions<TOfferForm>['initialValues'] = {
  cashback: { type: ECasbackType.FIXED },
  currency: ECurrency.AED,
  date_range: {},
  rules: [{ ...(defaultRuleValue as TOfferTargetingRule) }],
};

export const tabFieldsList = [
  {
    tab: ENewOfferFormTab.BASIC_DETAILS,
    fields: [
      'name',
      'customer_usage_limit',
      'description',
      'date_range.start_date',
      'date_range.end_date',
      'currency',
      'terms_and_conditions',
      'cashback.type',
      'cashback.amount',
      'cashback.minimum_transaction_value',
      'cashback.percentage',
      'cashback.maximum_amount',
    ],
  },
  {
    tab: ENewOfferFormTab.TARGETING,
    fields: ['cashback.total_budget', 'tenant', 'rules'],
  },
  {
    tab: ENewOfferFormTab.ASSETS,
    fields: ['banner_image_url', 'promotional_image_url', 'company_logo_url'],
  },
] as const satisfies Array<{ tab: ENewOfferFormTab; fields: DeepPaths<TOfferForm>[] }>;

export const requiredFields = [
  'name',
  'description',
  'customer_usage_limit',
  'cashback.total_budget',
  'tenant',
] satisfies DeepPaths<TOfferForm>[];

export function mapFormDataToApiPayload(values: TOfferForm) {
  const startDate = values.date_range.start_date ? toUtcStartOfDay(values.date_range.start_date) : undefined;
  const endDate = values.date_range.end_date ? toUtcEndOfDay(values.date_range.end_date) : undefined;

  const cashbackConfig =
    values.cashback.type === ECasbackType.FIXED
      ? {
          cashback_amount: values.cashback.amount,
          minimum_transaction_value: values.cashback.minimum_transaction_value,
        }
      : {
          cashback_percentage: values.cashback.percentage,
          maximum_cashback_value: values.cashback.maximum_amount,
        };
  const hasCashbackConfig = Object.values(cashbackConfig).some((value) => typeof value === 'number');

  return {
    name: values.name,
    description: values.description,
    redemptions_count_limit: values.customer_usage_limit,
    is_draft: false,
    budget_limit: values.cashback.total_budget,
    tenant_id: values.tenant.id,
    start_date: startDate?.toISOString(),
    end_date: endDate?.toISOString(),
    terms_and_conditions: values.terms_and_conditions,
    rules: values.rules
      .filter((r) => (r.target === ERuleTarget.BRAND ? r.brands.length > 0 : !!r.category))
      .map((rule) => ({
        transaction_count_lower_limit: rule.transaction_count?.min ?? null,
        transaction_count_upper_limit: rule.transaction_count?.max ?? null,
        transaction_amount_upper_limit: rule.amount_spent?.max ?? null,
        transaction_amount_lower_limit: rule.amount_spent?.min ?? null,
        number_of_days: rule.in_last_days,
        ...(rule.target === ERuleTarget.CATEGORY
          ? {
              target_category_ids: rule.category?.id ? [rule.category.id] : [],
              target_sub_category_ids: rule.subcategory?.id ? [rule.subcategory.id] : [],
              target_brand_ids: [],
            }
          : {
              target_brand_ids: rule.brands?.map((b) => b.id) ?? [],
              target_category_ids: [],
              target_sub_category_ids: [],
            }),
      })),
    cashback_rule: hasCashbackConfig
      ? {
          cashback_type: values.cashback.type,
          cashback_config: cashbackConfig,
        }
      : undefined,
  } satisfies TCreateOffer;
}

export function mapApiPayloadToFormData(offer: TOfferDetails): Parameters<FormContext<TOfferForm>['setValues']>[0] {
  let cashbackConfig: Partial<TOfferForm['cashback']>;

  if (offer.cashback_rule?.cashback_type === ECasbackType.PERCENTAGE) {
    const percentageConfig = offer.cashback_rule?.cashback_config as TPercentageCashbackConfig | undefined;
    cashbackConfig = {
      type: ECasbackType.PERCENTAGE,
      percentage: percentageConfig?.cashback_percentage,
      maximum_amount: percentageConfig?.maximum_cashback_value,
      total_budget: offer.budget_limit,
    };
  } else {
    const fixedConfig = offer.cashback_rule?.cashback_config as TFixedCashbackConfig | undefined;
    cashbackConfig = {
      type: ECasbackType.FIXED,
      amount: fixedConfig?.cashback_amount,
      minimum_transaction_value: fixedConfig?.minimum_transaction_value,
      total_budget: offer.budget_limit,
    };
  }

  return {
    name: offer.name,
    description: offer.description,
    customer_usage_limit: offer.redemptions_count_limit,
    banner_image_url: offer.offer_attachments?.find((a) => a.attachment_type === EAttachmentType.BANNER)?.image_url,
    promotional_image_url: offer.offer_attachments?.find((a) => a.attachment_type === EAttachmentType.PROMOTIONAL)
      ?.image_url,
    company_logo_url: offer.offer_attachments?.find((a) => a.attachment_type === EAttachmentType.LOGO)?.image_url,
    cashback: cashbackConfig,
    date_range: {
      start_date: offer.start_date ? toUtcStartOfDay(new Date(offer.start_date)) : undefined,
      end_date: offer.end_date ? toUtcStartOfDay(new Date(offer.end_date)) : undefined,
    },
    tenant: {
      id: offer.tenant_id,
      name: offer.tenant_name ?? '',
    },
    terms_and_conditions: offer.terms_and_conditions ?? undefined,
    rules: offer.offer_rules?.map((r) => {
      const target = Object.keys(r?.target_categories ?? {}).length > 0 ? ERuleTarget.CATEGORY : ERuleTarget.BRAND;
      const brands = Object.entries(r?.target_brands ?? {}).map(([id, name]) => ({ id: Number(id), name }));
      const [category] = Object.entries(r?.target_categories ?? {}).map(([id, name]) => ({ id: Number(id), name }));
      const [subcategory] = Object.entries(r?.target_sub_categories ?? {}).map(([id, name]) => ({
        id: Number(id),
        name,
      }));
      return {
        in_last_days: r?.number_of_days ?? 30,
        amount_spent: {
          min: r?.transaction_amount_lower_limit,
          max: r?.transaction_amount_upper_limit,
        },
        transaction_count: {
          min: r?.transaction_count_lower_limit,
          max: r?.transaction_count_upper_limit,
        },
        ...(target === ERuleTarget.BRAND
          ? {
              target,
              brands,
            }
          : {
              target,
              category: category!,
              subcategory,
            }),
      } as TOfferTargetingRule;
    }),
  };
}
