import { EAttachmentType } from '~/common/typedefs/enums';
import { MEGABYTE } from '~/common/utils/constants';

export const ASSET_UPLOAD_SECTIONS = [
  {
    id: EAttachmentType.BANNER,
    title: 'Banner Image (for card)',
    dimension: { width: 800, height: 600 },
    maxFileSize: 1 * MEGABYTE,
  },
  {
    id: EAttachmentType.PROMOTIONAL,
    title: 'Promotion strip (for homepage)',
    dimension: { width: 600, height: 200 },
    maxFileSize: 1 * MEGABYTE,
  },
  {
    id: EAttachmentType.LOGO,
    title: 'Company Logo',
    dimension: { width: 100, height: 100 },
    maxFileSize: 1 * MEGABYTE,
  },
];
