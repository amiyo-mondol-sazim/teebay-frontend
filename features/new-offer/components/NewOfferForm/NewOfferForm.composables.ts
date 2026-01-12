import { useForm } from 'vee-validate';
import { offerQueryKeys } from '~/common/api/offer/offer.keys';
import type { TOfferAttachment, TOfferDetails } from '~/common/typedefs/api';
import type { EAttachmentType } from '~/common/typedefs/enums';
import { ENewOfferFormTab } from '../NewOfferFormTabs/NewOfferFormTabs.enums';
import {
  formSchema,
  mapApiPayloadToFormData,
  mapFormDataToApiPayload,
  newOfferFormInitialValue,
  requiredFields,
  tabFieldsList,
  type TOfferForm,
} from './NewOfferForm.helpers';

const assetUploadStoreKey = Symbol('assetUploadStore') as InjectionKey<{
  assets: Record<EAttachmentType, File | TOfferAttachment | null>;
  setAsset: (asset: EAttachmentType, file: File | TOfferAttachment | null) => void;
}>;

export function provideAssetSelectionStore() {
  const assets = reactive<Record<EAttachmentType, File | TOfferAttachment | null>>({
    banner: null,
    promotional: null,
    logo: null,
  });

  function setAsset(asset: EAttachmentType, file: File | TOfferAttachment | null) {
    assets[asset] = file;
  }

  provide(assetUploadStoreKey, { assets, setAsset });
}

export function useAssetSelectionStore() {
  const data = inject(assetUploadStoreKey);
  if (!data) {
    throw new Error('Asset selection store not found');
  }
  return data;
}

export const useNewOfferForm = () => {
  const { query } = useRoute();
  const queryClient = useQueryClient();
  const currentTab = ref<ENewOfferFormTab>(ENewOfferFormTab.BASIC_DETAILS);
  const { data: draftOffer } = useOfferDetailsQuery(query.offerId ? Number(query.offerId) : null);
  const { mutate: createOffer, isPending: isCreatingOffer } = useCreateOfferMutation();
  const { mutate: updateOffer, isPending: isUpdatingOffer } = useUpdateOfferMutation();
  const { mutateAsync: addAttachments, isPending: isAddingOfferAttachments } = useAddOfferAttachmentsMutation();
  const { mutateAsync: deleteAttachments, isPending: isDeletingOfferAttachments } = useDeleteOfferAttachmentsMutation();

  const isLoading = computed(
    () =>
      isCreatingOffer.value ||
      isUpdatingOffer.value ||
      isAddingOfferAttachments.value ||
      isDeletingOfferAttachments.value,
  );

  const form = useForm({
    validationSchema: formSchema,
    initialValues: newOfferFormInitialValue,
    keepValuesOnUnmount: true,
  });

  const { assets, setAsset } = useAssetSelectionStore();

  const handleOfferAttachment = async (offerId: number) => {
    const assetsToAdd = Object.entries(assets)
      .map(([type, image]) => ({ type, image }))
      .filter((asset): asset is { type: EAttachmentType; image: File } => asset.image instanceof File);

    const assetIdsToDelete = draftOffer.value?.offer_attachments
      ?.filter((item) => (assets[item.attachment_type] as TOfferAttachment | null)?.id !== item.id)
      ?.map((item) => item.id);

    if (assetIdsToDelete?.length) {
      await deleteAttachments({ offerId, attachmentIds: assetIdsToDelete });
    }
    if (assetsToAdd.length) {
      await addAttachments({ offerId, attachments: assetsToAdd });
    }
  };

  const onSuccessCallback = async ({ id: offerId, status }: Pick<TOfferDetails, 'id' | 'status'>) => {
    if (!offerId) return;
    await handleOfferAttachment(offerId);

    queryClient.invalidateQueries({ queryKey: offerQueryKeys.lists() });
    queryClient.invalidateQueries({ queryKey: offerQueryKeys.detail(offerId) });

    navigateTo(status === 'draft' ? PAGE_URLS.HOME : PAGE_URLS.OFFER(offerId));
  };

  const onSubmit = form.handleSubmit(
    (values) => {
      const payload = { ...mapFormDataToApiPayload(values), is_draft: false };

      if (draftOffer.value?.id) {
        return void updateOffer({ id: draftOffer.value.id, offer: payload }, { onSuccess: onSuccessCallback });
      }
      createOffer({ data: payload }, { onSuccess: onSuccessCallback });
    },
    async ({ errors }) => {
      for (const tabFields of tabFieldsList) {
        if (tabFields.fields.some((field) => errors[field])) {
          currentTab.value = tabFields.tab;
          await Promise.resolve();
          form.validate();
          break;
        }
      }
    },
  );

  const saveAsDraft = async () => {
    const requiredFieldsValidation = await Promise.all(requiredFields.map((field) => form.validateField(field)));
    const [invalidField] = requiredFieldsValidation.filter((field) => !field.valid).map((_, i) => requiredFields[i]!);

    if (invalidField) {
      const tab = tabFieldsList.find((tab) => tab.fields.includes(invalidField as never));
      if (tab) {
        currentTab.value = tab.tab;
      }
      return;
    }
    const payload = { ...mapFormDataToApiPayload(form.values as TOfferForm), is_draft: true };

    if (draftOffer.value?.id) {
      return void updateOffer({ id: draftOffer.value.id, offer: payload }, { onSuccess: onSuccessCallback });
    }
    createOffer({ data: payload }, { onSuccess: onSuccessCallback });
  };

  watch(
    draftOffer,
    (newOffer) => {
      if (newOffer) {
        form.setValues(mapApiPayloadToFormData(newOffer), false);
        newOffer.offer_attachments?.forEach((attachment) => {
          setAsset(attachment.attachment_type as EAttachmentType, attachment);
        });
      }
    },
    { deep: true, immediate: true },
  );

  return { currentTab, onSubmit, saveAsDraft, isLoading };
};
