import { EAttachmentType } from '~/common/typedefs/enums';

export const ASSET_LABELS: Record<EAttachmentType, string> = {
  [EAttachmentType.BANNER]: 'Banner Image',
  [EAttachmentType.PROMOTIONAL]: 'Promotional Image',
  [EAttachmentType.LOGO]: 'Company Logo',
} as const;
