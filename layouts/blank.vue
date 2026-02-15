<script setup lang="ts">
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <slot />
    <UiToaster
      position="top-right"
      :rich-colors="true"
      :expand="true"
      :duration="4000"
      :gap="8"
      theme="system"
    />
  </div>
</template>
