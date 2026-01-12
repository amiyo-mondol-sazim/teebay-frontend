import { toast } from 'vue-sonner';
import type { TCreateOffer, TRuleTargetUserCountPayload, TUpdateOffer } from '../../typedefs/api';
import { client } from '../client';

async function createOffer({ data }: { data: TCreateOffer }) {
  const { data: offerData, error } = await client.POST('/api/v1/merchant/offers', { body: data });
  if (error || !offerData?.id)
    throw new Error((error as unknown as { error: string })?.error ?? 'Failed to create offer');

  return offerData;
}

async function updateOffer({ id, offer }: { id: number; offer: TUpdateOffer }) {
  const { data, error } = await client.PUT('/api/v1/merchant/offers/{id}', {
    params: { path: { id } },
    body: offer,
  });
  if (error || !data) throw new Error(error?.error ?? 'Failed to update offer');
  return data;
}

export function useCreateOfferMutation() {
  const toastId = 'create-offer';

  return useMutation({
    mutationFn: createOffer,
    onMutate: () => {
      toast.loading('Creating offer...', { id: toastId });
    },
    onSuccess: () => {
      toast.success('Offer created successfully', { id: toastId });
    },
    onError: (error) => {
      toast.error(error.message, { id: toastId });
    },
  });
}

export function useUpdateOfferMutation() {
  const toastId = 'update-offer';

  return useMutation({
    mutationFn: updateOffer,
    onMutate: () => {
      toast.loading('Updating offer...', { id: toastId });
    },
    onSuccess: () => {
      toast.success('Offer updated successfully', { id: toastId });
    },
    onError: (error) => {
      toast.error(error.message, { id: toastId });
    },
  });
}

async function getRuleTargetUserCount(payload: TRuleTargetUserCountPayload) {
  const { data, error } = await client.POST('/api/v1/merchant/rule_target_count', { body: payload });

  if (error || !data)
    throw new Error((error as unknown as { error: string })?.error ?? 'Failed to analyze rule target user count');
  return data.customer_count ?? 0;
}

export function useGetRuleTargetUserCountMutation() {
  return useMutation({ mutationFn: getRuleTargetUserCount });
}
