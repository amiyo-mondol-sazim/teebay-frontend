import type { HTMLAttributes } from 'vue';

export type TFormTextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  maxLength?: number;
  class?: HTMLAttributes['class'];
  inputClass?: HTMLAttributes['class'];
};
