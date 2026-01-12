<script setup lang="ts">
import { useFilter } from 'reka-ui';
import type { TComboboxObjectOption, TFormComboboxObjectProps } from './FormComboboxObject.types';

const props = defineProps<TFormComboboxObjectProps>();

const searchTerm = ref('');

const { contains } = useFilter({ sensitivity: 'base' });
const filteredOptions = computed(() => props.options.filter((p) => contains(p.name, searchTerm.value)));

const getOptionLabel = (val?: TComboboxObjectOption | TComboboxObjectOption[]) => {
  if (Array.isArray(val)) {
    return val.map((v) => v.name).join(', ');
  }
  return val?.name ?? '';
};
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="block gap-0">
      <UiFormLabel class="pb-3.5">{{ label }}</UiFormLabel>
      <UiCombobox
        class="w-full"
        ignore-filter
        :multiple
        :model-value="componentField.modelValue"
        @update:model-value="componentField.onChange"
      >
        <UiFormControl>
          <UiComboboxAnchor class="border-input h-10.5 w-full rounded-sm border">
            <div class="relative w-full items-center">
              <UiComboboxInput
                v-model="searchTerm"
                class="px-4 text-base leading-none"
                :display-value="getOptionLabel"
                :placeholder
                @blur="componentField.onBlur"
              />
              <UiComboboxTrigger class="absolute inset-y-0 end-1.5 flex h-10.5 items-center justify-center px-3">
                <Icon name="ph:caret-down-fill" class="text-muted-foreground size-4" />
              </UiComboboxTrigger>
            </div>
          </UiComboboxAnchor>
        </UiFormControl>
        <UiComboboxList align="start" class="max-h-76 w-64 overflow-hidden rounded-sm" @focus-outside.prevent>
          <UiComboboxEmpty>
            <span class="text-gray-400">No options</span>
          </UiComboboxEmpty>
          <UiComboboxViewport class="max-h-76">
            <UiComboboxVirtualizer
              v-slot="{ option }"
              :options="filteredOptions"
              :text-content="(v) => v.name"
              :estimate-size="36"
            >
              <UiComboboxItem :value="option" class="w-full rounded-sm">
                <span class="truncate">
                  {{ option.name }}
                </span>
                <UiComboboxItemIndicator>
                  <Icon name="ph:check" class="ml-auto size-4" />
                </UiComboboxItemIndicator>
              </UiComboboxItem>
            </UiComboboxVirtualizer>
          </UiComboboxViewport>
        </UiComboboxList>
      </UiCombobox>
      <div class="h-5 pt-2">
        <UiFormMessage class="text-xs leading-none" />
        <UiFormDescription v-if="description" class="hidden text-xs text-gray-100 only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
