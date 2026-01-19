<script setup lang="ts">
import { ETransaction } from "~/common/typedefs/enums";
import { useTransactionCard } from "./transactions.composables";

interface Props {
  transaction: TTransactionResponse;
  type: TTransactionType;
  tab: ESalesTab | ERentsTab;
}

const props = defineProps<Props>();

const {
  counterpartyName,
  amount,
  productId,
  counterpartyIcon,
  sale,
  rent,
  relativeTime,
} = useTransactionCard(props.transaction, props.tab);
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

          <div
            class="flex items-center gap-2 text-2xl font-bold text-foreground"
          >
            <Icon name="ph:currency-dollar" class="h-5 w-5 text-primary" />
            <span>{{ amount }}</span>
          </div>

          <div v-if="type === ETransaction.Rent" class="space-y-1">
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="ph:calendar-blank" class="h-3.5 w-3.5" />
              <span v-if="rent">
                {{ formatDate(rent.startDate) }} -
                {{ formatDate(rent.endDate) }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="ph:clock" class="h-3.5 w-3.5" />
              <span v-if="rent">Rented {{ relativeTime }}</span>
            </div>
          </div>

          <div
            v-else
            class="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Icon name="ph:calendar" class="h-3.5 w-3.5" />
            <span v-if="sale">{{ relativeTime }}</span>
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
