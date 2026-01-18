<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import type { TSaleResponse } from "~/common/typedefs/query";

interface Props {
  sale: TSaleResponse;
  type: ESalesTab;
}

const props = defineProps<Props>();

const counterpartyName = computed(() => {
  return props.type === ESalesTab.BOUGHT
    ? props.sale.seller?.email
    : props.sale.buyer?.email;
});
</script>

<template>
  <div
    class="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
  >
    <NuxtLink :to="`/products/${sale.product.id}`">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 space-y-3">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="ph:user" class="h-4 w-4" />
            <span class="font-medium">{{ counterpartyName }}</span>
          </div>

          <div
            class="flex items-center gap-2 text-2xl font-bold text-foreground"
          >
            <Icon name="ph:currency-dollar" class="h-5 w-5 text-primary" />
            <span>{{ sale.price }}</span>
          </div>

          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="ph:calendar" class="h-3.5 w-3.5" />
            <span>{{
              formatDistanceToNow(new Date(sale.createdAt), { addSuffix: true })
            }}</span>
          </div>
        </div>

        <NuxtLink
          :to="`/products/${sale.product.id}`"
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
