<script setup lang="ts">
import { format } from 'date-fns';
import { dateFromDateValue, dateValueFromDate } from './FormDatepicker.helpers';
import type { TFormDatepickerProps } from './FormDatepicker.types';

const { defaultDate, ...props } = defineProps<TFormDatepickerProps>();

const defaultDateValue = computed(() => {
  if (!defaultDate) return undefined;
  return dateValueFromDate(defaultDate);
});
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="block gap-0" :class="props.class">
      <UiFormLabel class="pb-3.5 text-gray-400">{{ label }}</UiFormLabel>
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiFormControl>
            <UiButton
              variant="outline"
              class="border-input data-[state=open]:ring-ring/50 h-10.5 w-full cursor-text rounded-sm bg-transparent px-4 font-normal transition-shadow hover:bg-transparent data-[state=open]:ring-2 md:text-base"
              :class="[
                componentField.modelValue ? '' : 'text-muted-foreground hover:text-muted-foreground',
                inputClass,
              ]"
            >
              <span>
                {{ componentField.modelValue ? format(componentField.modelValue, 'dd MMM, yyyy') : placeholder }}
              </span>
              <Icon name="ph:calendar-fill" class="text-primary-900/40 ml-auto size-5" />
            </UiButton>
            <input hidden />
          </UiFormControl>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-auto p-0" align="start">
          <UiCalendar
            initial-focus
            :calendar-label="label"
            :is-date-disabled
            :default-value="defaultDateValue"
            :number-of-months
            :model-value="componentField.modelValue ? dateValueFromDate(componentField.modelValue) : undefined"
            @update:model-value="
              (date) => {
                componentField.onChange(date ? dateFromDateValue(date) : undefined);
              }
            "
          />
        </UiPopoverContent>
      </UiPopover>
      <div class="h-5 pt-2">
        <UiFormMessage class="text-xs leading-none" />
        <UiFormDescription v-if="description" class="hidden text-xs text-gray-100 only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
