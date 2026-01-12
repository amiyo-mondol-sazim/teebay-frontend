import type { HTMLAttributes, InputHTMLAttributes } from 'vue';

export interface InputWithSuffixProps {
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  type?: InputHTMLAttributes['type'];
  description?: string;
  class?: HTMLAttributes['class'];
  suffixIcon?: string;
  suffixText?: string;
}
