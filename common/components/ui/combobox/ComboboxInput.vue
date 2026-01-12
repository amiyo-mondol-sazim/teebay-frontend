<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  ComboboxInput,
  type ComboboxInputEmits,
  type ComboboxInputProps,
  injectComboboxRootContext,
  useForwardPropsEmits,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '~/common/utils/css';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes['class'];
  }
>();

const emits = defineEmits<ComboboxInputEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const rootContext = injectComboboxRootContext();
const handleFocus = async () => {
  await nextTick();
  const hasValue =
    !!rootContext.modelValue.value ||
    (Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.length > 0);
  if (!rootContext.open.value && !hasValue) rootContext.onOpenChange(true);
};
</script>

<template>
  <div data-slot="command-input-wrapper">
    <ComboboxInput
      data-slot="command-input"
      :class="
        cn(
          'placeholder:text-muted-foreground flex h-10.5 w-full rounded-md bg-transparent px-3 py-1 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
      v-bind="{ ...forwarded, ...$attrs }"
      @focus="handleFocus"
    >
      <slot />
    </ComboboxInput>
  </div>
</template>
