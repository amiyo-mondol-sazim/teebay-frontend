<script setup lang="ts">
interface EmptyState {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  items: unknown[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isFetchingNextPage: boolean;
  loadMoreTriggerRef: (ref: Element | ComponentPublicInstance | null) => void;
  emptyState?: EmptyState;
}

defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-4">
      <div
        v-for="n in 6"
        :key="n"
        class="h-28 animate-pulse rounded-xl bg-muted/50"
      />
    </div>

    <!-- Error state -->
    <div
      v-else-if="isError"
      class="rounded-xl border border-destructive/20 bg-destructive/5 p-6"
    >
      <div class="flex items-start gap-4">
        <Icon name="ph:warning-circle" class="h-6 w-6 text-destructive" />
        <div>
          <h3 class="font-semibold text-destructive">Failed to load items</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ error?.message }}</p>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!items.length"
      class="min-h-[18.75rem] flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center"
    >
      <div
        class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
      >
        <Icon :name="emptyState?.icon || 'ph:circle-dashed'" class="h-8 w-8 text-primary" />
      </div>
      <h3 class="text-lg font-semibold">{{ emptyState?.title || 'No items yet' }}</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        {{ emptyState?.description || 'Get started by adding your first item' }}
      </p>
    </div>

    <!-- Items list -->
    <div v-else class="space-y-3">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <slot name="default" v-bind="{ items }" />
      </TransitionGroup>
    </div>

    <!-- Load more trigger -->
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
