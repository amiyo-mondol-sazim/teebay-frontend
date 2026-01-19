export type TRentalPeriod = ERentalPeriod;

export const getRentPricePerDay = (
  rentPrice: number,
  rentalPeriod: TRentalPeriod,
): number => {
  if (rentalPeriod === ERentalPeriod.WEEK) {
    return rentPrice / 7;
  }
  if (rentalPeriod === ERentalPeriod.MONTH) {
    return rentPrice / 30;
  }
  return rentPrice;
};

export const calculateRentalCost = (
  startDate: string,
  endDate: string,
  rentPrice: number,
): number => {
  if (!startDate || !endDate) return 0;

  if (
    !isValidDate(startDate) ||
    !isValidDate(endDate) ||
    isDateAfter(startDate, endDate)
  ) {
    return 0;
  }

  const days = getDateDiff(endDate, startDate) + 1;
  return days * rentPrice;
};

export const validateRentalDates = (
  startDate: string,
  endDate: string,
): { startDate?: string; endDate?: string } => {
  const errors: { startDate?: string; endDate?: string } = {};

  if (!startDate) {
    errors.startDate = "Start date is required";
  } else if (isDatePast(startDate)) {
    errors.startDate = "Start date cannot be in the past";
  }

  if (!endDate) {
    errors.endDate = "End date is required";
  } else if (isDatePast(endDate)) {
    errors.endDate = "End date cannot be in the past";
  }

  if (startDate && endDate && isDateAfter(startDate, endDate)) {
    errors.endDate = "End date must be after start date";
  }

  return errors;
};

export type TRentalDateErrors = ReturnType<typeof validateRentalDates>;

export const calculateRentalDuration = (
  startDate: string,
  endDate: string,
): number | null => {
  if (!startDate || !endDate) return null;

  if (
    !isValidDate(startDate) ||
    !isValidDate(endDate) ||
    isDateAfter(startDate, endDate)
  ) {
    return null;
  }

  return getDateDiff(endDate, startDate) + 1;
};

export const formatRentalDuration = (days: number): string => {
  return days === 1 ? "1 day" : `${days} days`;
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return "Select date";
  return formatDate(dateString, "MMM dd, yyyy");
};
