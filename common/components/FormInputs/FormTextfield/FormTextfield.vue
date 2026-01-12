<script setup lang="ts">
import type { TFormTextfieldProps } from './FormTextfield.types';

const props = defineProps<TFormTextfieldProps>();

const showPassword = ref(false);
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="relative block gap-0" :class="props.class">
      <UiFormLabel class="block truncate pb-3.5 text-gray-400">{{ label }}</UiFormLabel>
      <UiButton
        v-if="type === 'password'"
        type="button"
        variant="ghost"
        size="icon"
        class="text-foreground/50 hover:text-accent-foreground/50 absolute top-7.5 right-1"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="showPassword = !showPassword"
      >
        <Icon :name="`ph:${showPassword ? 'eye' : 'eye-closed'}`" />
      </UiButton>
      <UiFormControl>
        <UiInput
          v-bind="componentField"
          :type="showPassword ? 'text' : type"
          :placeholder
          class="px-4 md:text-base"
          :class="inputClass"
          :disabled="disabled"
        />
      </UiFormControl>
      <div class="h-5 pt-2">
        <UiFormMessage class="text-xs leading-none" />
        <UiFormDescription v-if="description" class="hidden text-xs text-gray-100 only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
