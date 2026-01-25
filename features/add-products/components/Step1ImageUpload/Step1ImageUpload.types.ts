export type Step1Props = {
  imageUrl: string | null;
};

export type Step1Emits = {
  (e: "update", value: string): void;
  (e: "next"): void;
};
