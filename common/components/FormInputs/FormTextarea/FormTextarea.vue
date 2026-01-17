<script setup lang="ts">
import { useFieldError } from 'vee-validate';
import type { TFormTextareaProps } from './FormTextarea.types';

const props = defineProps<TFormTextareaProps>();

const error = useFieldError(props.name);
</script>

<template>
  <UiFormField v-slot="{ componentField }" :name>
    <UiFormItem class="block gap-0" :class="props.class">
      <UiFormLabel class="pb-3.5 text-muted-foreground">{{ label }}</UiFormLabel>
      <UiFormControl>
        <UiTextarea
          v-bind="componentField"
          :placeholder
          class="p-4 md:text-base"
          :class="props.inputClass"
          :max-length="maxLength"
        />
      </UiFormControl>
      <div class="min-h-5 pt-2">
        <p
          v-if="maxLength"
          class="text-xs"
          :class="componentField.modelValue?.length > maxLength ? 'text-destructive' : 'text-muted-foreground'"
        >
          {{ componentField.modelValue?.length || 0 }}/{{ maxLength }} Characters
        </p>

        <UiFormMessage v-if="error" class="text-xs leading-none" />
        <UiFormDescription v-else-if="description && !maxLength" class="hidden text-xs only:block">
          {{ description }}
        </UiFormDescription>
      </div>
    </UiFormItem>
  </UiFormField>
</template>
