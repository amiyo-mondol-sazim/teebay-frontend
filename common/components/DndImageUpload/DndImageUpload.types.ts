import { ACCEPTED_FILE_TYPES } from "./DndImageUpload.constants";

export type TDndImageUploadProps = {
  accept?: Array<(typeof ACCEPTED_FILE_TYPES)[number] | (string & {})>;
  modelValue: File | { id: number; url?: string; image_url?: string } | null;
  maxFileSize?: number;
  maxDimensions?: { width: number; height: number };
};
