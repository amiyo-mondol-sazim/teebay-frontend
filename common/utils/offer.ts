import type { TOffer } from '../typedefs/api';

export const formatOfferTiming = (range: Pick<TOffer, 'start_date' | 'end_date'>) => {
  const start = range.start_date ? formatDate(range.start_date, 'MMM dd', true) : null;
  const end = range.end_date ? formatDate(range.end_date, 'MMM dd', true) : null;

  if (!start && !end) return 'n/a';

  return `${start ?? 'n/a'} - ${end ?? 'n/a'}`;
};
