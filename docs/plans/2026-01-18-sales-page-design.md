# Sales Page Design

**Date:** 2026-01-18
**Author:** Claude
**Status:** Approved

## Overview

A sales history page where users can view their bought and sold items. Uses tabbed interface with infinite scroll for seamless browsing.

## Feature Structure

```
features/sales/
├── containers/
│   └── SalesContainer.vue          # Smart: data fetching, tab state, infinite scroll
├── components/
│   ├── SalesTabs.vue               # Dumb: Shadcn tabs for Bought/Sold toggle
│   ├── SalesList.vue               # Dumb: list with loading/error/empty states
│   └── SaleCard/
│       └── SaleCard.vue            # Dumb: individual sale card
└── Sales.types.ts                  # ESalesTab enum
```

**Page Route:** `/pages/sales/index.vue`

## Architecture

### API Layer

**Update `common/typedefs/query.ts`:**
```typescript
export type TSalesListResponse = components["schemas"]["SalesListResponse"];
export type TSaleResponse = components["schemas"]["SaleResponse"];
```

**Create `common/api/sales/sales.queries.ts`:**
- `useBoughtSalesInfiniteQuery(userId, params, options?)`
- `useSoldSalesInfiniteQuery(userId, params, options?)`
- Uses existing `getNextPage` / `getPreviousPage` from `~/common/utils/pagination`
- Conditional fetching via `enabled` option based on active tab

### Smart/Dumb Separation

**Container (`SalesContainer.vue`):**
- Fetches current user → gets `userId`
- Manages `activeTab` state (`ESalesTab.BOUGHT` | `ESalesTab.SOLD`)
- Runs both queries with `enabled` conditioned on active tab
- Handles infinite scroll with `useIntersectionObserver`
- Computes current data/loading/error based on active tab

**Components (Purely Presentational):**
- `SalesTabs`: Emits `update:modelValue` with `ESalesTab`
- `SalesList`: Receives data via props, handles loading/error/empty UI
- `SaleCard`: Displays counterparty, price, date; links to product page

## UI Specifications

### Sales Tab Component
- Shadcn `UiTabs` with two triggers
- Icons: `ph:shopping-cart` (Bought), `ph:currency-dollar` (Sold)
- Full-width grid layout

### Sale Card Content
- **Counterparty name** (buyer/seller email based on tab)
- **Sale price** with currency icon
- **Date of sale** (relative time via `date-fns` `formatDistanceToNow`)
- **No product image** (as per requirements)
- Hover effect reveals "view product" arrow button

### Loading/Error/Empty States
- **Loading:** Skeleton cards (6 items)
- **Error:** Destructive-themed error box with retry
- **Empty:** Icon + contextual message based on tab

## Navigation

Add to sidebar nav items:
```typescript
{
  name: "My Sales",
  path: "/sales",
  icon: "ph:currency-dollar",
}
```

## Data Flow

```
User → SalesContainer
  ↓
Fetch userId (useUserQuery)
  ↓
Initialize both infinite queries (enabled based on activeTab)
  ↓
User switches tab → only active query fires
  ↓
Scroll to bottom → fetchNextPage for active tab
  ↓
Data passed to SalesList → SaleCard components
```

## Dependencies

- `@tanstack/vue-query` - infinite queries
- `@vueuse/core` - useIntersectionObserver
- `date-fns` - formatDistanceToNow
- Shadcn Vue - UiTabs, UiButton
- Phosphor icons - via @nuxt/icon

## Implementation Checklist

- [ ] Add sales types to `common/typedefs/query.ts`
- [ ] Create `common/api/sales/sales.queries.ts`
- [ ] Create `features/sales/Sales.types.ts` with `ESalesTab` enum
- [ ] Create `features/sales/containers/SalesContainer.vue`
- [ ] Create `features/sales/components/SalesTabs.vue`
- [ ] Create `features/sales/components/SalesList.vue`
- [ ] Create `features/sales/components/SaleCard/SaleCard.vue`
- [ ] Create `pages/sales/index.vue`
- [ ] Add "My Sales" to sidebar navigation
- [ ] Test infinite scroll on both tabs
- [ ] Test empty states
- [ ] Test error states
