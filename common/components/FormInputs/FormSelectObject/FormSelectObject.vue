<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import type { TFormSelectObjectProps } from './FormSelectObject.types';

defineProps<TFormSelectObjectProps>();

const emits = defineEmits<{
  (e: 'loadMore'): void;
}>();

const intersectionTarget = useTemplateRef<HTMLDivElement>('intersectionTarget');

useIntersectionObserver(intersectionTarget, ([entry]) => {
  if (entry?.isIntersecting) emits('loadMore');
});
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="block gap-0">
      <UiFormLabel class="pb-3.5">{{ label }}</UiFormLabel>
      <UiSelect v-bind="componentField">
        <UiFormControl>
          <UiSelectTrigger class="w-full rounded-sm px-5 data-[size=default]:h-10.5">
            <UiSelectValue :placeholder />
          </UiSelectTrigger>
        </UiFormControl>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectItem v-for="option in options" :key="option.id" :value="option">
              {{ option.name }}
            </UiSelectItem>
            <div ref="intersectionTarget" class="h-2"></div>
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
