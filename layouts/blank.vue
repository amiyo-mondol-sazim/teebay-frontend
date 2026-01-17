<script setup lang="ts">
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <slot />
    <UiToaster :rich-colors="true" />
  </div>
</template>
