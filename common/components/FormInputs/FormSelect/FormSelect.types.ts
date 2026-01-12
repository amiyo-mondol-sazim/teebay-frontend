import type { HTMLAttributes } from 'vue';

export type TSelectOption = { label: string; value: string | number; disabled?: boolean };

export type TFormSelectProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  options: Array<TSelectOption>;
  class?: HTMLAttributes['class'];
  inputClass?: HTMLAttributes['class'];
};
