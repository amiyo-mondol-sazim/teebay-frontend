import type { HTMLAttributes } from 'vue';

export type TRadioGroupOption = { label: string; value: string; icon?: string };

export type TFormRadioGroupProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  class?: HTMLAttributes['class'];
  options: Array<TRadioGroupOption>;
};
