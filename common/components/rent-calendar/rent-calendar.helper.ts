import dayjs from "dayjs";

export const getRentPricePerDay = (
  rentPrice: number,
  rentalPeriod: string,
): number => {
  let rentPriceDividedByDay = rentPrice;
  if (rentalPeriod === ERentalPeriod.WEEK) {
    rentPriceDividedByDay = rentPrice / 7;
  } else if (rentalPeriod === ERentalPeriod.MONTH) {
    rentPriceDividedByDay = rentPrice / 30;
  }
  return rentPriceDividedByDay;
};

export const calculateRentalCost = (
  startDate: string,
  endDate: string,
  rentPrice: number,
): number => {
  if (!startDate || !endDate) return 0;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (!start.isValid() || !end.isValid() || start.isAfter(end)) return 0;

  const days = end.diff(start, "day") + 1;
  return days * rentPrice;
};

export const validateRentalDates = (
  startDate: string,
  endDate: string,
): { startDate?: string; endDate?: string } => {
  const errors: { startDate?: string; endDate?: string } = {};
  const today = dayjs().startOf("day");

  if (!startDate) {
    errors.startDate = "Start date is required";
  } else if (dayjs(startDate).isBefore(today)) {
    errors.startDate = "Start date cannot be in the past";
  }

  if (!endDate) {
    errors.endDate = "End date is required";
  } else if (dayjs(endDate).isBefore(today)) {
    errors.endDate = "End date cannot be in the past";
  }

  if (startDate && endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    if (start.isAfter(end)) {
      errors.endDate = "End date must be after start date";
    }
  }

  return errors;
};

export type TRentalDateErrors = ReturnType<typeof validateRentalDates>;

export const calculateRentalDuration = (
  startDate: string,
  endDate: string,
): number | null => {
  if (!startDate || !endDate) return null;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (!start.isValid() || !end.isValid() || start.isAfter(end)) return null;

  return end.diff(start, "day") + 1;
};

export const formatRentalDuration = (days: number): string => {
  return days === 1 ? "1 day" : `${days} days`;
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "Select date";
  return dayjs(dateString).format("MMM DD, YYYY");
};
