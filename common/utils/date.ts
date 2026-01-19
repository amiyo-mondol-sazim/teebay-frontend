import {
  addDays,
  differenceInDays,
  format,
  formatDistanceToNow as dfnsFormatDistanceToNow,
  isAfter,
  isBefore,
  isValid,
  startOfDay,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (
  date: Date | string | number,
  formatStr: string = "MMM dd, yyyy",
  asUtc = false,
): string => {
  if (asUtc) {
    return formatInTimeZone(new Date(date), "UTC", formatStr);
  }
  return format(new Date(date), formatStr);
};

export const toUtcStartOfDay = (date: Date): Date => {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};

export const toUtcEndOfDay = (date: Date): Date => {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1) -
      1,
  );
};

export const formatDistanceToNow = (
  date: Date | string | number,
  options?: { addSuffix?: boolean },
): string => {
  return dfnsFormatDistanceToNow(new Date(date), options);
};

export const isValidDate = (date: Date | string | number): boolean => {
  return isValid(new Date(date));
};

export const isDateBefore = (
  date: Date | string | number,
  dateToCompare: Date | string | number,
): boolean => {
  return isBefore(new Date(date), new Date(dateToCompare));
};

export const isDateAfter = (
  date: Date | string | number,
  dateToCompare: Date | string | number,
): boolean => {
  return isAfter(new Date(date), new Date(dateToCompare));
};

export const isDatePast = (date: Date | string | number): boolean => {
  return isBefore(new Date(date), startOfDay(new Date()));
};

export const getStartOfDay = (date: Date | string | number = new Date()): Date => {
  return startOfDay(new Date(date));
};

export const getDateDiff = (
  dateLeft: Date | string | number,
  dateRight: Date | string | number,
): number => {
  return differenceInDays(new Date(dateLeft), new Date(dateRight));
};
