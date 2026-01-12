export type TComboboxObjectOption = {
  id: number;
  name: string;
};

export type TFormComboboxObjectProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  multiple?: boolean;
  options: Array<TComboboxObjectOption>;
};
