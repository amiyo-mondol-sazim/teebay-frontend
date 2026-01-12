<script setup lang="ts">
import { useFieldValue, useSetFieldValue } from 'vee-validate';
import FormTextfield from '~/common/components/FormInputs/FormTextfield/FormTextfield.vue';
import { ERangeCondition, type ECurrency } from '~/common/typedefs/enums';
import FormInputWithSuffix from '../FormInputWithSuffix/FormInputWithSuffix.vue';
import type { TCountRange } from '../NewOfferForm/NewOfferForm.helpers';
import { RANGE_OPTIONS } from './RangeInput.constants';
import { getRangeCondition } from './RangeInput.helpers';

const props = defineProps<{ field: 'amount_spent' | 'transaction_count'; name: string }>();

const rangeValue = useFieldValue<TCountRange>(props.name);
const currency = useFieldValue<ECurrency>('currency');
const setMinValue = useSetFieldValue<TCountRange['min']>(`${props.name}.min`);
const setMaxValue = useSetFieldValue<TCountRange['max']>(`${props.name}.max`);

const rangeType = computed({
  get: () => getRangeCondition(rangeValue),
  set: (value) => {
    if (value === ERangeCondition.LESS_THAN) {
      setMinValue(null);
      setMaxValue(undefined);
    } else if (value === ERangeCondition.MORE_THAN) {
      setMinValue(undefined);
      setMaxValue(null);
    } else if (value === ERangeCondition.BETWEEN) {
      setMinValue(undefined);
      setMaxValue(undefined);
    } else {
      setMinValue(null);
      setMaxValue(null);
    }
  },
});

const InputComponent = props.field === 'amount_spent' ? FormInputWithSuffix : FormTextfield;
</script>

<template>
  <div class="grid grid-cols-3 items-start gap-2">
    <div class="flex h-22.5 flex-col gap-3.5">
      <UiLabel>
        {{ field === 'amount_spent' ? 'Amount Spent' : 'Transaction Count' }}
      </UiLabel>
      <UiSelect v-model="rangeType">
        <UiSelectTrigger class="h-11! w-full rounded-sm">
          <UiSelectValue placeholder="Select Condition" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="option in RANGE_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>
    <div class="col-span-2 flex items-center gap-2">
      <InputComponent
        v-if="rangeType && rangeType !== ERangeCondition.LESS_THAN"
        label="&nbsp;"
        :name="`${name}.min`"
        class="max-w-9/20 flex-1"
        type="number"
        :suffix-text="currency"
      />
      <span v-if="rangeType === ERangeCondition.BETWEEN" class="pt-2 text-center"> and </span>
      <InputComponent
        v-if="rangeType && rangeType !== ERangeCondition.MORE_THAN"
        label="&nbsp;"
        :name="`${name}.max`"
        type="number"
        class="max-w-9/20 flex-1"
        :suffix-text="currency"
      />
    </div>
  </div>
</template>
