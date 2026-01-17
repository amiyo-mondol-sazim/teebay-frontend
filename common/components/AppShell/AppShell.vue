<script lang="ts" setup>
import { navItems } from "./AppShell.helpers";

const route = useRoute();
</script>

<template>
  <UiSidebarProvider class="h-svh">
    <AppSidebar :nav-items="navItems" />
    <UiSidebarInset class="h-full">
      <UiScrollArea :key="route.path" class="h-full w-full">
        <slot />
      </UiScrollArea>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>
