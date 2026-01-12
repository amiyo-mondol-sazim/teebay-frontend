<script setup lang="ts">
import { provideAssetSelectionStore } from '../components/NewOfferForm/NewOfferForm.composables';
provideAssetSelectionStore();
</script>

<template>
  <div class="relative min-h-screen bg-white">
    <NewOfferForm />
  </div>
</template>
