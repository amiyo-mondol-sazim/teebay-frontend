export type TSelectObjectOption = { name: string; id: string | number };

export type TFormSelectObjectProps = {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  options: Array<TSelectObjectOption>;
};
