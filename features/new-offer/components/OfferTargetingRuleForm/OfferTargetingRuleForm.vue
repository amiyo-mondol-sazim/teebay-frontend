<script setup lang="ts">
import { useFieldValue, useSetFieldValue } from 'vee-validate';
import { type ECurrency, ERuleTarget } from '~/common/typedefs/enums';
import type { TOfferTargetingRule } from '../NewOfferForm/NewOfferForm.helpers';
import { RULE_TARGET_OPTIONS } from './OfferTargetingRuleForm.constants';

const props = defineProps<{
  index: number;
}>();
const emits = defineEmits<{ (e: 'remove'): void }>();

const name = `rules.${props.index}`;
const target = useFieldValue<ERuleTarget>(`${name}.target`);

const currentRule = useFieldValue<TOfferTargetingRule>(name);
const currency = useFieldValue<ECurrency>('currency');

const setBrandValue = useSetFieldValue(`${name}.brands`);
const setCategoryValue = useSetFieldValue(`${name}.category`);

watch(target, () => {
  if (target.value === ERuleTarget.CATEGORY) {
    setBrandValue([]);
  } else if (target.value === ERuleTarget.BRAND) {
    setCategoryValue(undefined);
  }
});
</script>

<template>
  <div class="border-gray-40 flex flex-col gap-6 rounded-md border p-6">
    <div class="flex items-center gap-2 text-xl font-bold">
      <span class="bg-primary flex size-5 items-center justify-center rounded-[0.25rem]">
        <Icon name="ph:check-bold" class="text-primary-foreground inline size-3" />
      </span>
      <span>Rule {{ index + 1 }}</span>
      <UiButton variant="ghost" type="button" size="icon" class="ml-auto" @click="emits('remove')">
        <Icon name="ph:trash" class="text-destructive inline size-5" />
      </UiButton>
    </div>
    <FormRadioGroup label="Target by" :name="`${name}.target`" :options="RULE_TARGET_OPTIONS" />
    <div v-if="target === ERuleTarget.CATEGORY" class="grid grid-cols-2 gap-4">
      <CategorySelect :name />
    </div>
    <BrandsMultiselect v-if="target === ERuleTarget.BRAND" :name="`${name}.brands`" />
    <RangeInput :name="`${name}.amount_spent`" field="amount_spent" />
    <RangeInput :name="`${name}.transaction_count`" field="transaction_count" />

    <div class="">
      <UiFormField v-slot="{ componentField }" :name="`${name}.in_last_days`">
        <UiFormItem class="relative block gap-0">
          <UiFormLabel class="block truncate pb-3.5 text-gray-400">Date Range</UiFormLabel>
          <UiFormControl>
            <div class="flex items-center gap-2">
              In the last
              <UiInput
                v-bind="componentField"
                type="number"
                placeholder="1-90"
                class="w-20 px-4 text-center"
                min="1"
                max="90"
              />
              Days
            </div>
          </UiFormControl>
          <div class="h-5 pt-2">
            <UiFormMessage class="text-xs leading-none" />
          </div>
        </UiFormItem>
      </UiFormField>
    </div>
    <RuleSummary class="border-none" :rule="currentRule" :currency="currency" />
  </div>
</template>
