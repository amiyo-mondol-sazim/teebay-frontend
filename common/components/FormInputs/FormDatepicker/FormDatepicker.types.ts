import type { CalendarRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

export type TFormDatepickerProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  class?: HTMLAttributes['class'];
  inputClass?: HTMLAttributes['class'];
  isDateDisabled?: CalendarRootProps['isDateDisabled'];
  numberOfMonths?: CalendarRootProps['numberOfMonths'];
  defaultDate?: Date;
};
