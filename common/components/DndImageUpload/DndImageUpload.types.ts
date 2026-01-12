import type { TOfferAttachment } from '~/common/typedefs/api';
import type { ACCEPTED_FILE_TYPES } from './DndImageUpload.constants';

export type TDndImageUploadProps = {
  accept?: Array<(typeof ACCEPTED_FILE_TYPES)[number] | (string & {})>;
  modelValue: File | TOfferAttachment | null;
  maxFileSize?: number;
  maxDimensions?: { width: number; height: number };
};
