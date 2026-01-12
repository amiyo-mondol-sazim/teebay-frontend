<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { isBefore } from 'date-fns';
import { useFieldValue } from 'vee-validate';
import { ECasbackType } from '~/common/typedefs/enums';
import type { TOfferForm } from '../NewOfferForm/NewOfferForm.helpers';
import { CASHBACK_TYPE_OPTIONS, CURRENCY_OPTIONS } from './StepBasicDetails.constants';

const cashbackType = useFieldValue<TOfferForm['cashback']['type']>('cashback.type');

const isDateDisabled = (date: DateValue) => {
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return isBefore(date.toDate(timeZoneName), new Date());
};
</script>

<template>
  <h2 class="text-primary-900 mb-10 text-[1.75rem] font-bold">Basic Details</h2>
  <div class="space-y-6">
    <div class="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-3">
      <FormTextfield
        label="Offer Name"
        name="name"
        placeholder="Enter a name"
        description="Keep a short, simple name"
        class="md:col-span-2"
        :max-length="127"
      />
      <FormTextfield
        label="Customer Usage Limit"
        name="customer_usage_limit"
        placeholder="Number of uses"
        type="number"
        description="Times a User can redeem"
      />
    </div>
    <FormTextarea
      label="Offer Description"
      class="min-h-24.5"
      name="description"
      placeholder="More details about your offer..."
      :max-length="300"
    />
    <div class="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
      <FormDatepicker
        label="Start Date"
        name="date_range.start_date"
        placeholder="Choose a date..."
        :number-of-months="2"
        :is-date-disabled="isDateDisabled"
      />
      <FormDatepicker
        label="End Date"
        name="date_range.end_date"
        placeholder="Choose a date..."
        :number-of-months="2"
        :is-date-disabled="isDateDisabled"
      />
    </div>
    <FormRadioGroup label="Cashback Type" name="cashback.type" :options="CASHBACK_TYPE_OPTIONS" />

    <div v-if="cashbackType === ECasbackType.FIXED" class="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2">
      <div class="flex">
        <FormTextfield
          label="Cashback Amount"
          name="cashback.amount"
          type="number"
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
      <div class="flex">
        <FormTextfield
          label="Minimum Transaction Value"
          name="cashback.minimum_transaction_value"
          input-class="rounded-r-none"
          placeholder="Amount"
          type="number"
        />
        <FormSelect
          label="&nbsp;"
          name="currency"
          :options="CURRENCY_OPTIONS"
          input-class="w-24 rounded-l-none border-l-0"
        />
      </div>
    </div>
    <div v-else-if="cashbackType === ECasbackType.PERCENTAGE" class="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2">
      <FormInputWithSuffix
        label="Cashback Percentage"
        name="cashback.percentage"
        placeholder="Enter Percentage Cashback"
        class="w-full"
        suffix-icon="ph:percent"
        type="number"
      />

      <div class="flex">
        <FormTextfield
          label="Maximum Cashback"
          name="cashback.maximum_amount"
          input-class="rounded-r-none"
          placeholder="Amount"
          type="number"
        />
        <FormSelect
          label="&nbsp;"
          name="currency"
          :options="CURRENCY_OPTIONS"
          input-class="w-24 rounded-l-none border-l-0"
        />
      </div>
    </div>

    <FormTextarea
      label="Terms & Conditions"
      name="terms_and_conditions"
      input-class="min-h-22.5"
      placeholder="Enter terms & conditions"
      :max-length="1024"
    />
  </div>
</template>
