import { now, type DateValue } from "@internationalized/date";
import type { ComputedRef, Ref } from "vue";

import {
  formatRentalDuration,
  getRentPricePerDay,
  validateRentalDates,
  type TRentalDateErrors,
} from "../components/rent-calendar/rent-calendar.helper";

interface UseRentDateStateOptions {
  rentPrice: number;
  rentalPeriod: string;
}

interface UseRentDateStateReturn {
  startDate: Ref<DateValue | undefined>;
  endDate: Ref<DateValue | undefined>;
  errors: Ref<TRentalDateErrors>;
  today: DateValue;
  minValue: DateValue;

  dailyRate: ComputedRef<number>;
  totalRentingCost: ComputedRef<number>;
  rentalDuration: ComputedRef<string | null>;

  isDateDisabled: (date: DateValue) => boolean;
  isEndDateDisabled: (date: DateValue) => boolean;
  validate: () => boolean;
  handleStartDateSelect: (date: DateValue | undefined) => void;
  handleEndDateSelect: (date: DateValue | undefined) => void;
  getConfirmData: () => { startDate: string; endDate: string };
  reset: () => void;
}

export function useRentDateState(
  options: UseRentDateStateOptions,
): UseRentDateStateReturn {
  const { rentPrice, rentalPeriod } = options;

  const startDate = ref<DateValue>();
  const endDate = ref<DateValue>();
  const errors = ref<TRentalDateErrors>({});

  const today = now("UTC");
  const minValue = today;

  const isDateDisabled = (date: DateValue) => date.compare(today) < 0;

  const isEndDateDisabled = (date: DateValue) =>
    isDateDisabled(date) ||
    (startDate.value ? date.compare(startDate.value) < 0 : false);

  const dailyRate = computed(() => getRentPricePerDay(rentPrice, rentalPeriod));

  const totalRentingCost = computed(() => {
    if (!startDate.value || !endDate.value) return 0;

    const days = endDate.value.compare(startDate.value) + 1;
    if (days <= 0) return 0;
    return days * dailyRate.value;
  });

  const rentalDuration = computed(() => {
    if (!startDate.value || !endDate.value) return null;

    const days = endDate.value.compare(startDate.value) + 1;
    if (days <= 0) return null;
    return formatRentalDuration(days);
  });

  const validate = (): boolean => {
    if (!startDate.value || !endDate.value) {
      return false;
    }

    const startDateStr = startDate.value.toString();
    const endDateStr = endDate.value.toString();

    errors.value = validateRentalDates(startDateStr, endDateStr);
    return Object.keys(errors.value).length === 0;
  };

  const handleStartDateSelect = (date: DateValue | undefined) => {
    if (!date) return;
    startDate.value = date;

    if (endDate.value && date.compare(endDate.value) > 0) {
      endDate.value = undefined;
    }

    errors.value = {};
  };

  const handleEndDateSelect = (date: DateValue | undefined) => {
    if (!date) return;
    if (startDate.value && date.compare(startDate.value) < 0) return;

    endDate.value = date;
    errors.value = {};
  };

  const getConfirmData = () => ({
    startDate: startDate.value?.toString() ?? "",
    endDate: endDate.value?.toString() ?? "",
  });

  const reset = () => {
    startDate.value = undefined;
    endDate.value = undefined;
    errors.value = {};
  };

  return {
    startDate,
    endDate,
    errors,
    today,
    minValue,
    dailyRate,
    totalRentingCost,
    rentalDuration,
    isDateDisabled,
    isEndDateDisabled,
    validate,
    handleStartDateSelect,
    handleEndDateSelect,
    getConfirmData,
    reset,
  };
}
