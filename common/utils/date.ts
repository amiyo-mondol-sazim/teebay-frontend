import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date: Date | string | number, formatStr: string = 'MMM dd, yyyy', asUtc = false): string => {
  if (asUtc) {
    return formatInTimeZone(new Date(date), 'UTC', formatStr);
  }
  return format(new Date(date), formatStr);
};

export const toUtcStartOfDay = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

export const toUtcEndOfDay = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1) - 1);
};
