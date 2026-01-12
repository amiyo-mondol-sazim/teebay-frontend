# PAGES IMPLEMENTATION GUIDE

**Context:** Nuxt File-Based Routing
**Role:** Thin Entry Points

## ARCHITECTURE

Pages act as the "Router View" layer. They map URL parameters to Feature Containers.

## IMPLEMENTATION RULES

### 1. No Logic

- **Forbidden**: API calls, complex state, business logic.
- **Allowed**: Route parameter extraction, layout definition.

### 2. Composition

- Pages MUST import a **Container** from `features/*/containers/`.
- They should pass route params as props to the Container.

### 3. Naming Convention

- Use `index.vue` for cleaner directory structure.
- Example: `pages/offers/create/index.vue` instead of `pages/offers/create.vue`.

## TEMPLATE PATTERN

```vue
<script setup lang="ts">
// Only imports
import FeatureContainer from "~/features/feature-name/containers/FeatureContainer.vue";

definePageMeta({
  layout: "default", // or 'auth', 'dashboard'
});
</script>

<template>
  <FeatureContainer />
</template>
```
