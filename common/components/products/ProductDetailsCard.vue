<script setup lang="ts">
import { useCreateConversationMutation } from "~/common/api/conversations/conversations.mutations";
import { PRODUCT_STATUS_CLASSES } from "./products.helper";

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
    <div class="rounded-xl bg-card p-6">
      <div class="grid gap-6 md:grid-cols-2 items-start">
        <div
          class="aspect-video rounded-lg bg-muted flex items-center justify-center md:sticky md:top-6 md:self-stretch md:aspect-auto"
        >
          <NuxtImg
            v-if="product.imageUrl"
            :src="product.imageUrl"
            :alt="product.title"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
          <span v-else class="text-muted-foreground">Image Placeholder</span>
        </div>

        <div class="flex flex-col h-full">
          <div class="space-y-4 shrink-0">
            <div class="flex justify-between">
              <div>
                <h1 class="font-serif text-2xl font-bold text-primary">
                  {{ product.title }}
                </h1>
                <p class="mt-2 text-muted-foreground">
                  {{ product.description }}
                </p>
              </div>
              <UiButton
                :loading="isMessaging"
                :disabled="isOwnProduct"
                @click="handleMessageOwner"
                class="cursor-pointer"
              >
                <Icon name="heroicons:chat-bubble-left" class="mr-2 h-4 w-4" />
                Message Owner
              </UiButton>
            </div>

            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="(category, index) in product.categories"
                :key="index"
                variant="secondary"
                class="bg-primary/10 text-primary"
              >
                {{ category }}
              </UiBadge>
            </div>

            <UiBadge :class="PRODUCT_STATUS_CLASSES[product.status]">
              {{ product.status }}
            </UiBadge>

            <div class="flex items-center gap-2 text-muted-foreground">
              <Icon name="heroicons:eye" class="h-4 w-4" />
              <span>{{ product.viewCount }} views</span>
            </div>

            <div class="flex items-center gap-2 text-muted-foreground">
              <Icon name="heroicons:calendar" class="h-4 w-4" />
              <span>Created on {{ formatDate(product.createdAt) }}</span>
            </div>

            <ProductPriceDisplay :product="product" />
          </div>

          <div class="shrink-0">
            <PreviousRentalsContainer :product-id="product.id" />
          </div>

          <div class="shrink-0 mt-4">
            <ProductActionButtons
              :on-buy="handleBuy"
              :on-rent="handleRent"
              :is-buying="isBuying"
              :is-renting="isRenting"
              :is-own-product="isOwnProduct"
              :product-status="product.status as EProductStatus"
            />
          </div>
        </div>
      </div>
    </div>

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
