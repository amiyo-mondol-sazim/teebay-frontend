<script setup lang="ts">
import { useField, useFieldArray } from 'vee-validate';
import { defaultRuleValue, type TOfferTargetingRule } from '../NewOfferForm/NewOfferForm.helpers';
import { CURRENCY_OPTIONS } from '../StepBasicDetails/StepBasicDetails.constants';
import { TENANTS_PER_PAGE } from './StepOfferTargeting.constants';

const { data: tenants, fetchNextPage } = useTenantsInfiniteQuery({ per_page: TENANTS_PER_PAGE });

const { fields, push, remove } = useFieldArray<TOfferTargetingRule>('rules');
const rulesField = useField('rules');

const addRule = () => push({ ...defaultRuleValue } as TOfferTargetingRule);
const removeRule = (index: number) => {
  remove(index);
};
</script>

<template>
  <h2 class="text-primary-900 mb-10 text-[1.75rem] font-bold">Offer Targeting</h2>
  <div class="grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2">
    <div class="flex">
      <FormTextfield
        label="Total Offer Budget"
        type="number"
        name="cashback.total_budget"
        input-class="rounded-r-none"
        placeholder="Amount"
      />
      <FormSelect
        label="&nbsp;"
        name="currency"
        :options="CURRENCY_OPTIONS"
        input-class="w-24 rounded-l-none border-l-0"
      />
    </div>

    <FormSelectObject
      label="Bank"
      name="tenant"
      :options="tenants ?? []"
      placeholder="Select Bank"
      @load-more="fetchNextPage"
    />
  </div>
  <div class="space-y-10 pt-10">
    <OfferTargetingRuleForm
      v-for="(field, index) in fields"
      :key="field.key"
      :index="index"
      @remove="removeRule(index)"
    />
    <div class="flex flex-col gap-2">
      <UiButton
        variant="outline"
        class="h-15 w-full gap-3 border-dashed border-gray-50 text-xl font-semibold"
        type="button"
        @click="addRule"
      >
        <Icon name="ph:plus-circle" class="size-6" />
        Add New Rule
      </UiButton>
      <p v-if="rulesField.errorMessage.value" class="text-destructive text-xs leading-none">
        <Icon name="ph:warning-fill" class="fill-destructive mr-1 inline size-3" />
        {{ rulesField.errorMessage }}
      </p>
    </div>
  </div>
</template>
