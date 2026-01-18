# Sales Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a `/sales` page where users can view their purchase and sales history with tabbed interface and infinite scroll.

**Architecture:** Feature-driven structure with smart container handling data fetching/API calls and dumb components handling presentation. Uses TanStack Query infinite queries, VueUse intersection observer, and Shadcn Vue tabs.

**Tech Stack:** Nuxt 3, TypeScript, TanStack Query, VueUse, date-fns, Shadcn Vue, Phosphor icons

---

## Task 1: Add Sales Types to Common Typedefs

**Files:**
- Modify: `common/typedefs/query.ts`

**Step 1: Add sales type exports**

Add to `common/typedefs/query.ts`:

```typescript
export type TSalesListResponse = components["schemas"]["SalesListResponse"];
export type TSaleResponse = components["schemas"]["SaleResponse"];
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS (no errors)

**Step 3: Commit**

```bash
git add common/typedefs/query.ts
git commit -m "feat(types): add sales response types"
```

---

## Task 2: Create Sales Queries

**Files:**
- Create: `common/api/sales/sales.queries.ts`

**Step 1: Create sales queries file**

Create `common/api/sales/sales.queries.ts`:

```typescript
import { useInfiniteQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "vue";
import type { TSalesListResponse } from "~/common/typedefs/query";
import { getNextPage, getPreviousPage } from "~/common/utils/pagination";
import { client } from "../client";
import { salesKeys } from "./sales.keys";

export const getBoughtSales = async (userId: number, params: { page: number; limit: number }): Promise<TSalesListResponse> => {
  const { data, error } = await client.GET("/api/v1/sales/bought/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch bought sales");
  }
  return data;
};

export const useBoughtSalesInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => salesKeys.bought(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getBoughtSales(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};

export const getSoldSales = async (userId: number, params: { page: number; limit: number }): Promise<TSalesListResponse> => {
  const { data, error } = await client.GET("/api/v1/sales/sold/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch sold sales");
  }
  return data;
};

export const useSoldSalesInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => salesKeys.sold(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getSoldSales(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add common/api/sales/sales.queries.ts
git commit -m "feat(api): add bought/sold sales infinite queries"
```

---

## Task 3: Create Sales Feature Types

**Files:**
- Create: `features/sales/Sales.types.ts`

**Step 1: Create sales types enum**

Create `features/sales/Sales.types.ts`:

```typescript
export enum ESalesTab {
  BOUGHT = "bought",
  SOLD = "sold",
}
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add features/sales/Sales.types.ts
git commit -m "feat(sales): add sales tab enum"
```

---

## Task 4: Create SaleCard Component

**Files:**
- Create: `features/sales/components/SaleCard/SaleCard.vue`

**Step 1: Create sale card component**

Create `features/sales/components/SaleCard/SaleCard.vue`:

```vue
<script setup lang="ts">
import type { TSaleResponse } from "~/common/typedefs/query";
import { ESalesTab } from "~/features/sales/Sales.types";
import { formatDistanceToNow } from "date-fns";

interface Props {
  sale: TSaleResponse;
  type: ESalesTab;
}

defineProps<Props>();

const counterpartyName = computed(() => {
  return props.type === ESalesTab.BOUGHT
    ? props.sale.seller?.email ?? "Unknown"
    : props.sale.buyer?.email ?? "Unknown";
});
</script>

<template>
  <div class="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 space-y-3">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="ph:user" class="h-4 w-4" />
          <span class="font-medium">{{ counterpartyName }}</span>
        </div>

        <div class="flex items-center gap-2 text-2xl font-bold text-foreground">
          <Icon name="ph:currency-dollar" class="h-5 w-5 text-primary" />
          <span>{{ sale.price }}</span>
        </div>

        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="ph:calendar" class="h-3.5 w-3.5" />
          <span>{{ formatDistanceToNow(new Date(sale.createdAt), { addSuffix: true }) }}</span>
        </div>
      </div>

      <NuxtLink
        :to="`/products/${sale.product.id}`"
        class="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <UiButton variant="ghost" size="icon-sm">
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add features/sales/components/SaleCard/SaleCard.vue
git commit -m "feat(sales): add sale card component"
```

---

## Task 5: Create SalesTabs Component

**Files:**
- Create: `features/sales/components/SalesTabs.vue`

**Step 1: Create sales tabs component**

Create `features/sales/components/SalesTabs.vue`:

```vue
<script setup lang="ts">
import { ESalesTab } from "~/features/sales/Sales.types";

interface Props {
  modelValue: ESalesTab;
}

interface Emits {
  (e: "update:modelValue", value: ESalesTab): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <UiTabs :default-value="modelValue" @update:model-value="$emit('update:modelValue', $event as ESalesTab)">
    <UiTabsList class="grid w-full max-w-md grid-cols-2">
      <UiTabsTrigger :value="ESalesTab.BOUGHT">
        <Icon name="ph:shopping-cart" class="mr-2 h-4 w-4" />
        Bought
      </UiTabsTrigger>
      <UiTabsTrigger :value="ESalesTab.SOLD">
        <Icon name="ph:currency-dollar" class="mr-2 h-4 w-4" />
        Sold
      </UiTabsTrigger>
    </UiTabsList>
  </UiTabs>
</template>
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add features/sales/components/SalesTabs.vue
git commit -m "feat(sales): add sales tabs component"
```

---

## Task 6: Create SalesList Component

**Files:**
- Create: `features/sales/components/SalesList.vue`

**Step 1: Create sales list component**

Create `features/sales/components/SalesList.vue`:

```vue
<script setup lang="ts">
import type { TSaleResponse } from "~/common/typedefs/query";
import { ESalesTab } from "~/features/sales/Sales.types";

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
      <div v-for="n in 6" :key="n" class="h-28 animate-pulse rounded-xl bg-muted/50" />
    </div>

    <div v-else-if="isError" class="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
      <div class="flex items-start gap-4">
        <Icon name="ph:warning-circle" class="h-6 w-6 text-destructive" />
        <div>
          <h3 class="font-semibold text-destructive">Failed to load sales</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ error?.message }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="!sales.length" class="min-h-[300px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center">
      <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Icon :name="type === ESalesTab.BOUGHT ? 'ph:shopping-cart' : 'ph:currency-dollar'" class="h-8 w-8 text-primary" />
      </div>
      <h3 class="text-lg font-semibold">No {{ type }} items yet</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        {{ type === ESalesTab.BOUGHT ? 'Start shopping' : 'Make your first sale' }}
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

    <div :ref="loadMoreTriggerRef" class="flex h-12 items-center justify-center">
      <div v-if="isFetchingNextPage" class="flex items-center gap-2 text-muted-foreground">
        <Icon name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
        <span class="text-sm">Loading more...</span>
      </div>
    </div>
  </div>
</template>
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add features/sales/components/SalesList.vue
git commit -m "feat(sales): add sales list component"
```

---

## Task 7: Create SalesContainer

**Files:**
- Create: `features/sales/containers/SalesContainer.vue`

**Step 1: Create sales container**

Create `features/sales/containers/SalesContainer.vue`:

```vue
<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ESalesTab } from "~/features/sales/Sales.types";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);

const activeTab = ref<ESalesTab>(ESalesTab.BOUGHT);
const limit = 12;

const {
  data: boughtData,
  fetchNextPage: fetchNextBoughtPage,
  hasNextPage: hasNextBoughtPage,
  isFetchingNextPage: isFetchingNextBoughtPage,
  isLoading: isBoughtLoading,
  isError: isBoughtError,
  error: boughtError,
} = useBoughtSalesInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  { enabled: computed(() => activeTab.value === ESalesTab.BOUGHT && !!userId.value) }
);

const {
  data: soldData,
  fetchNextPage: fetchNextSoldPage,
  hasNextPage: hasNextSoldPage,
  isFetchingNextPage: isFetchingNextSoldPage,
  isLoading: isSoldLoading,
  isError: isSoldError,
  error: soldError,
} = useSoldSalesInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  { enabled: computed(() => activeTab.value === ESalesTab.SOLD && !!userId.value) }
);

const currentData = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? boughtData.value : soldData.value
);
const currentLoading = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? isBoughtLoading.value : isSoldLoading.value
);
const currentError = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? boughtError.value : soldError.value
);
const currentIsError = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? isBoughtError.value : isSoldError.value
);
const currentIsFetchingNextPage = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? isFetchingNextBoughtPage.value : isFetchingNextSoldPage.value
);
const currentHasNextPage = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? hasNextBoughtPage.value : hasNextSoldPage.value
);

const loadMoreTrigger = ref<HTMLElement | null>(null);
const setLoadMoreTrigger = (ref: Element | ComponentPublicInstance | null) => {
  loadMoreTrigger.value = ref as HTMLElement | null;
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && currentHasNextPage.value && !currentIsFetchingNextPage.value) {
    if (activeTab.value === ESalesTab.BOUGHT) fetchNextBoughtPage();
    else fetchNextSoldPage();
  }
});
</script>

<template>
  <div v-if="userId" class="space-y-8">
    <div class="rounded-3xl bg-gradient-to-br from-primary/10 to-background p-8">
      <h1 class="text-4xl font-bold font-serif">My Sales</h1>
      <p class="mt-2 text-muted-foreground">
        Track your purchases and sales history
      </p>
    </div>

    <SalesTabs v-model="active-tab" />

    <SalesList
      :sales="currentData ?? []"
      :type="activeTab"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
    />
  </div>

  <div v-else-if="isUserLoading" class="flex min-h-[400px] items-center justify-center">
    <div class="juggle-loader" />
  </div>
</template>
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add features/sales/containers/SalesContainer.vue
git commit -m "feat(sales): add sales container with infinite scroll"
```

---

## Task 8: Create Sales Page

**Files:**
- Create: `pages/sales/index.vue`

**Step 1: Create sales page**

Create `pages/sales/index.vue`:

```vue
<script setup lang="ts">
import SalesContainer from "~/features/sales/containers/SalesContainer.vue";
</script>

<template>
 SalesContainer
</template>
```

**Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add pages/sales/index.vue
git commit -m "feat(sales): add sales page route"
```

---

## Task 9: Add Sidebar Navigation

**Files:**
- Modify: `common/components/AppSidebar/AppSidebarContainer.vue` (or wherever nav items are defined)

**Step 1: Find sidebar nav items location**

Run: `grep -r "My Products" common/components/AppSidebar/`
Expected: Find file containing nav items array

**Step 2: Add sales nav item**

Add to nav items array (likely in container or parent):

```typescript
{
  name: "My Sales",
  path: "/sales",
  icon: "ph:currency-dollar",
}
```

**Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 4: Commit**

```bash
git add common/components/AppSidebar/AppSidebarContainer.vue
git commit -m "feat(nav): add My Sales link to sidebar"
```

---

## Task 10: Manual Testing

**Step 1: Start dev server**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 2: Test bought tab**

1. Navigate to http://localhost:3000/sales
2. Click "Bought" tab
3. Verify items load
4. Scroll to bottom
5. Verify infinite scroll loads more items
6. Verify counterparty name, price, and date display
7. Verify clicking arrow navigates to product page

**Step 3: Test sold tab**

1. Click "Sold" tab
2. Verify items load
3. Scroll and verify infinite scroll
4. Verify all data displays correctly

**Step 4: Test empty states**

1. If you have no sales, verify empty state shows with correct icon and message

**Step 5: Test loading states**

1. Open browser dev tools → Network tab
2. Throttle to "Slow 3G"
3. Navigate to /sales
4. Verify skeleton loaders appear

**Step 6: Test error states**

1. Temporarily set invalid API base URL
2. Refresh page
3. Verify error message displays

---

## Task 11: Lint and Final Checks

**Step 1: Run linter**

Run: `npm run lint`
Expected: PASS (no warnings/errors)

**Step 2: Fix any lint issues**

Run: `npm run lint:fix` if needed

**Step 3: Final typecheck**

Run: `npm run typecheck`
Expected: PASS

**Step 4: Final commit**

```bash
git add .
git commit -m "chore(sales): final cleanup and lint fixes"
```

---

## Summary

This implementation plan creates a complete sales history page with:
- Tabbed interface (Bought/Sold)
- Infinite scroll pagination
- Loading/error/empty states
- Clean smart/dumb component separation
- Proper TypeScript typing
- Consistent with existing codebase patterns

Total estimated time: 45-60 minutes
