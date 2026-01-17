<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate';
import type { HTMLAttributes } from 'vue';
import { cn } from '~/common/utils/css';
import { useFormField } from './useFormField';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage :id="formMessageId" v-slot="{ message }" data-slot="form-message" :name="toValue(name)">
    <p :class="cn('text-destructive-foreground text-sm', props.class)">
      <Icon name="ph:warning-fill" class="fill-destructive mr-1 inline size-3" />
      {{ message }}
    </p>
  </ErrorMessage>
</template>
