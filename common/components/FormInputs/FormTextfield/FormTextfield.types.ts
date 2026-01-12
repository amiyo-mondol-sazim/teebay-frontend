import type { HTMLAttributes, InputHTMLAttributes } from 'vue';

export type TFormTextfieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: InputHTMLAttributes['type'];
  description?: string;
  class?: HTMLAttributes['class'];
  inputClass?: HTMLAttributes['class'];
  disabled?: boolean;
};
