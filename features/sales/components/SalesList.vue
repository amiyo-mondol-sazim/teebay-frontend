<script setup lang="ts">
import type { TSaleResponse } from "~/common/typedefs/query";

interface Props {
  sales: TSaleResponse[];
  type: ESalesTab;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isFetchingNextPage: boolean;
  loadMoreTriggerRef: (ref: Element | ComponentPublicInstance | null) => void;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="space-y-4">
      <div
        v-for="n in 6"
        :key="n"
        class="h-28 animate-pulse rounded-xl bg-muted/50"
      />
    </div>

    <div
      v-else-if="isError"
      class="rounded-xl border border-destructive/20 bg-destructive/5 p-6"
    >
      <div class="flex items-start gap-4">
        <Icon name="ph:warning-circle" class="h-6 w-6 text-destructive" />
        <div>
          <h3 class="font-semibold text-destructive">Failed to load sales</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ error?.message }}</p>
        </div>
      </div>
    </div>

    <div
      v-else-if="!sales.length"
      class="min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center"
    >
      <div
        class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
      >
        <Icon
          :name="
            type === ESalesTab.BOUGHT
              ? 'ph:shopping-cart'
              : 'ph:currency-dollar'
          "
          class="h-8 w-8 text-primary"
        />
      </div>
      <h3 class="text-lg font-semibold">No {{ type }} items yet</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        {{
          type === ESalesTab.BOUGHT ? "Start shopping" : "Make your first sale"
        }}
      </p>
    </div>

    <div v-else class="space-y-3">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <SaleCard
          v-for="sale in sales"
          :key="sale.id"
          :sale="sale"
          :type="type"
        />
      </TransitionGroup>
    </div>

    <div
      :ref="loadMoreTriggerRef"
      class="flex h-12 items-center justify-center"
    >
      <div
        v-if="isFetchingNextPage"
        class="flex items-center gap-2 text-muted-foreground"
      >
        <Icon name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        <span class="text-sm">Loading more...</span>
      </div>
    </div>
  </div>
</template>
