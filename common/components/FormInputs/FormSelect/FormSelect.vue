<script setup lang="ts">
import type { TFormSelectProps } from './FormSelect.types';

const props = defineProps<TFormSelectProps>();
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="block gap-0" :class="props.class">
      <UiFormLabel class="pb-3.5">{{ label }}</UiFormLabel>
      <UiSelect v-bind="componentField">
        <UiFormControl>
          <UiSelectTrigger class="w-full rounded-sm px-5 data-[size=default]:h-10.5" :class="inputClass">
            <UiSelectValue :placeholder />
          </UiSelectTrigger>
        </UiFormControl>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.label }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
      <div class="h-5 pt-2">
        <UiFormMessage class="text-xs leading-none" />
        <UiFormDescription v-if="description" class="hidden text-xs text-gray-100 only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
