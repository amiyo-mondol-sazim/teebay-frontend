<script setup lang="ts">
import type { TFormRadioGroupProps } from './FormRadioGroup.types';

const props = defineProps<TFormRadioGroupProps>();
</script>

<template>
  <UiFormField v-slot="{ field: componentField }" :name>
    <UiFormItem class="block gap-0" :class="props.class">
      <UiFormLabel class="pb-3.5 text-gray-400">{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiRadioGroup v-bind="componentField" class="flex justify-between gap-3.5">
          <UiLabel
            v-for="option in options"
            :key="option.value"
            :data-has-icon="!!option.icon"
            :data-selected="componentField.value === option.value"
            class="group data-[selected=true]:border-primary data-[selected=true]:bg-primary-25 border-gray-40 relative flex-1 cursor-pointer rounded-sm border p-4 transition-colors duration-200 data-[has-icon=true]:h-25"
          >
            <UiRadioGroupItem :value="option.value" class="sr-only" />
            <div
              class="group-data-[selected=true]:bg-primary bg-gray-20 border-gray-40 flex size-4 items-center justify-center rounded-full border group-data-[has-icon=true]:absolute group-data-[has-icon=true]:top-2.5 group-data-[has-icon=true]:left-2.5 group-data-[selected=true]:border-none"
            >
              <div class="hidden size-1.5 rounded-full bg-white group-data-[selected=true]:block" />
            </div>
            <div
              class="group-data-[selected=true]:text-primary-900 flex items-center gap-2 text-gray-200"
              :class="option.icon ? 'w-full flex-col gap-3 text-base' : ''"
            >
              <Icon v-if="option.icon" :name="option.icon" class="size-6" />
              <span class="leading-none">{{ option.label }}</span>
            </div>
          </UiLabel>
        </UiRadioGroup>
      </UiFormControl>
      <div class="min-h-5 pt-2">
        <UiFormMessage class="text-xs leading-none" />
        <UiFormDescription v-if="description" class="hidden text-xs text-gray-100 only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
