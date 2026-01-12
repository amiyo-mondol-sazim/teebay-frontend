import { ERangeCondition } from '~/common/typedefs/enums';

export const RANGE_OPTIONS = [
  { label: 'Is more than', value: ERangeCondition.MORE_THAN },
  { label: 'Is less than', value: ERangeCondition.LESS_THAN },
  { label: 'Is between', value: ERangeCondition.BETWEEN },
];
