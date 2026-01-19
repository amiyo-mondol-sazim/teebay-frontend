export const getStatusLabel = (props: { status: EProductStatusFilter }) => {
  const s = props.status;
  if (s === EProductStatusFilter.ALL) return "";
  return STATUS_LABELS[s] || "";
};

export const toggleCategory = (category: string, currentValues: string[], emit: (value: string[]) => void) => {
  const newValue = currentValues.includes(category)
    ? currentValues.filter((c) => c !== category)
    : [...currentValues, category];
  emit(newValue);
};
