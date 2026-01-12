<script setup lang="ts">
import type { InputWithSuffixProps } from './FormInputWithSuffix.types';

const props = defineProps<InputWithSuffixProps>();

const suffixContent = computed(() => {
  if (props.suffixIcon) {
    return { type: 'icon', value: props.suffixIcon };
  }
  if (props.suffixText) {
    return { type: 'text', value: props.suffixText };
  }
  return null;
});
</script>

<template>
  <div class="relative flex w-full" :class="props.class">
    <FormTextfield :label :name :placeholder :type :description class="w-full" :disabled input-class="rounded-r-none" />
    <div
      class="border-input mt-7 flex h-10.5 items-center rounded-r-sm border border-l-0 px-4"
      :class="disabled ? 'opacity-50' : ''"
    >
      <Icon v-if="suffixContent?.type === 'icon'" :name="suffixContent.value" class="size-5 text-gray-400" />
      <span v-else-if="suffixContent?.type === 'text'" class="text-sm text-gray-400">
        {{ suffixContent.value }}
      </span>
    </div>
  </div>
</template>
