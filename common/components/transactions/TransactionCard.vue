<script setup lang="ts">
import { formatDistanceToNow, format } from "date-fns";
import type {
  TTransactionResponse,
  ETransactionType,
  TSaleResponse,
  TRentResponse,
} from "~/common/typedefs/query";
import { ESalesTab, ERentsTab } from "~/common/typedefs/enums";

interface Props {
  transaction: TTransactionResponse;
  type: ETransactionType;
  tab: ESalesTab | ERentsTab;
}

const props = defineProps<Props>();

const isSale = (tx: TTransactionResponse): tx is TSaleResponse => {
  return 'price' in tx && 'buyer' in tx && 'seller' in tx;
};

const isRent = (tx: TTransactionResponse): tx is TRentResponse => {
  return 'rentPrice' in tx && 'startDate' in tx && 'endDate' in tx;
};

const counterpartyName = computed(() => {
  if (isSale(props.transaction)) {
    return props.tab === ESalesTab.BOUGHT
      ? props.transaction.seller?.email
      : props.transaction.buyer?.email;
  } else {
    return props.tab === ERentsTab.BORROWS
      ? props.transaction.owner?.email
      : props.transaction.renter?.email;
  }
});

const amount = computed(() => {
  if (isSale(props.transaction)) {
    return props.transaction.price;
  } else {
    return props.transaction.rentPrice;
  }
});

const productId = computed(() => {
  return props.transaction.product.id;
});

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM d, yyyy');
};

const counterpartyIcon = computed(() => {
  if (props.type === 'sale') {
    return props.tab === ESalesTab.BOUGHT ? 'ph:user' : 'ph:user';
  } else {
    return props.tab === ERentsTab.BORROWS ? 'ph:user' : 'ph:user';
  }
});
</script>

<template>
  <div
    class="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
  >
    <NuxtLink :to="`/products/${productId}`">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 space-y-3">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon :name="counterpartyIcon" class="h-4 w-4" />
            <span class="font-medium">{{ counterpartyName }}</span>
          </div>

          <div class="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Icon name="ph:currency-dollar" class="h-5 w-5 text-primary" />
            <span>{{ amount }}</span>
          </div>

          <div v-if="type === 'rent'" class="space-y-1">
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="ph:calendar-blank" class="h-3.5 w-3.5" />
              <span v-if="isRent(transaction)">
                {{ formatDate(transaction.startDate) }} - {{ formatDate(transaction.endDate) }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="ph:clock" class="h-3.5 w-3.5" />
              <span v-if="isRent(transaction)">
                Rented {{ formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true }) }}
              </span>
            </div>
          </div>

          <div v-else class="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="ph:calendar" class="h-3.5 w-3.5" />
            <span v-if="isSale(transaction)">
              {{ formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true }) }}
            </span>
          </div>
        </div>

        <NuxtLink
          :to="`/products/${productId}`"
          class="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <UiButton variant="ghost" size="sm">
            <Icon name="ph:arrow-right" class="h-4 w-4" />
          </UiButton>
        </NuxtLink>
      </div>
    </NuxtLink>
  </div>
</template>
