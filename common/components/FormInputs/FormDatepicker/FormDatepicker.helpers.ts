import { CalendarDate, type DateValue } from '@internationalized/date';

export function dateFromDateValue(date: DateValue): Date {
  return new Date(Date.UTC(date.year, date.month - 1, date.day));
}

export function dateValueFromDate(date: Date): DateValue {
  return new CalendarDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}
