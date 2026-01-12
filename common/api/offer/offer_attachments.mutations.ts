import { toast } from 'vue-sonner';
import type { EAttachmentType } from '~/common/typedefs/enums';
import { client } from '../client';

export function useAddOfferAttachmentsMutation() {
  const addAttachment = async ({ offerId, type, image }: { offerId: number; type: EAttachmentType; image: File }) => {
    const { data, error } = await client.POST('/api/v1/merchant/offers/{id}/add_attachments', {
      params: { path: { id: offerId } },
      body: { attachment_type: type, image: '' },
      bodySerializer: () => {
        const formData = new FormData();
        formData.append('attachment_type', type);
        formData.append('image', image);
        return formData;
      },
    });
    if (error || !data) throw new Error('Failed to add attachment');
    return data;
  };

  const addAttachments = async ({
    offerId,
    attachments,
  }: {
    offerId: number;
    attachments: { type: EAttachmentType; image: File }[];
  }) => {
    const data = await Promise.all(attachments.map((attachment) => addAttachment({ offerId, ...attachment })));
    return data;
  };

  const toastId = 'add-offer-attachments';

  return useMutation({
    mutationFn: addAttachments,
    onMutate: () => {
      toast.loading('Adding attachments...', { id: toastId });
    },
    onSuccess: () => {
      toast.success('Attachments added successfully', { id: toastId });
    },
    onError: () => {
      toast.error('Failed to add attachments', { id: toastId });
    },
  });
}

export function useDeleteOfferAttachmentsMutation() {
  const deleteAttachment = async ({ offerId, attachmentIds }: { offerId: number; attachmentIds: number[] }) => {
    await client.DELETE('/api/v1/merchant/offers/{id}/remove_attachments', {
      params: {
        path: {
          id: offerId,
        },
      },
      body: {
        attachment_ids: attachmentIds,
      },
    });
  };

  const toastId = 'delete-offer-attachments';

  return useMutation({
    mutationFn: deleteAttachment,
    onMutate: () => {
      toast.loading('Deleting attachments...', { id: toastId });
    },
    onSuccess: () => {
      toast.success('Attachments deleted successfully', { id: toastId });
    },
    onError: () => {
      toast.error('Failed to delete attachments', { id: toastId });
    },
  });
}
