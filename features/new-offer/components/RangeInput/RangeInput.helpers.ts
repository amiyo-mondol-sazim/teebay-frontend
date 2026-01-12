import { ERangeCondition } from '~/common/typedefs/enums';
import type { TCountRange } from '../NewOfferForm/NewOfferForm.helpers';

export const getRangeCondition = (rangeValue: MaybeRef<TCountRange>) => {
  const { min, max } = toValue(rangeValue);
  if (min === null && max === null) return null;
  if (min === null) return ERangeCondition.LESS_THAN;
  if (max === null) return ERangeCondition.MORE_THAN;
  if (min !== null && max !== null) return ERangeCondition.BETWEEN;
  return null;
};
