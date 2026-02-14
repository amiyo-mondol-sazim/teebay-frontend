<script setup lang="ts">
import { useCreateConversationMutation } from "~/common/api/conversations/conversations.mutations";
import { PAGE_URLS } from "~/common/utils/constants";

interface Props {
  productId: number;
}

const props = defineProps<Props>();

const {
  data: product,
  isLoading,
  isError,
  error,
} = useProductDetailQuery(toRef(props, "productId"));

const buyMutation = useBuyProductMutation();
const rentMutation = useCreateRentMutation();
const incrementViewsMutation = useIncrementViewsMutation();
const conversationMutation = useCreateConversationMutation();

onMounted(() => {
  if (props.productId) {
    incrementViewsMutation.mutate(props.productId);
  }
});

const { data: user } = useUserQuery();
const isOwnProduct = computed(
  () => product.value?.owner?.id === user.value?.id,
);

const isBuying = computed(() => buyMutation.isPending.value);
const isRenting = computed(() => rentMutation.isPending.value);
const isMessaging = computed(() => conversationMutation.isPending.value);

const buyModalOpen = ref(false);
const rentModalOpen = ref(false);

const handleBuy = () => {
  buyModalOpen.value = true;
};

const handleRent = () => {
  rentModalOpen.value = true;
};

const handleMessageOwner = () => {
  if (!product.value?.owner?.id) {
    return;
  }
  conversationMutation.mutate(
    {
      participantId: product.value.owner.id,
      productId: product.value.id,
    },
    {
      onSuccess: (data) => {
        navigateTo(`${PAGE_URLS.CONVERSATIONS}?conversationId=${data.id}`);
      },
    },
  );
};

const handleBuyConfirm = () => {
  if (product.value) {
    buyMutation.mutate(product.value.id);
    buyModalOpen.value = false;
  }
};

const handleBuyCancel = () => {
  buyModalOpen.value = false;
};

const handleRentConfirm = (dates: { startDate: string; endDate: string }) => {
  if (product.value) {
    rentMutation.mutate({
      productId: product.value.id,
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
    rentModalOpen.value = false;
  }
};

const handleRentCancel = () => {
  rentModalOpen.value = false;
};
</script>

<template>
  <div v-if="isLoading">
    <UiSkeleton class="h-96 w-full" />
  </div>

  <div v-else-if="isError">
    <div class="text-center">
      <p class="text-destructive">
        Failed to load product: {{ error?.message }}
      </p>
      <UiButton @click="$router.go(0)">Retry</UiButton>
    </div>
  </div>

  <div v-else-if="product">
    <ProductDetailsCard
      :product="product"
      :on-buy="handleBuy"
      :on-rent="handleRent"
      :on-message="handleMessageOwner"
      :is-buying="isBuying"
      :is-renting="isRenting"
      :is-messaging="isMessaging"
      :is-own-product="isOwnProduct"
    />

    <BuyConfirmationModal
      :product="product"
      :open="buyModalOpen"
      :is-loading="isBuying"
      @confirm="handleBuyConfirm"
      @cancel="handleBuyCancel"
    />

    <RentDatePickerModal
      :product="product"
      :open="rentModalOpen"
      :is-loading="isRenting"
      @confirm="handleRentConfirm"
      @cancel="handleRentCancel"
    />
  </div>
</template>
