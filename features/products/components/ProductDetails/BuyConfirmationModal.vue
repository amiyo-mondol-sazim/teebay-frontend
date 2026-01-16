<script setup lang="ts">
import type { components } from "~/common/typedefs/api-schema";

interface Props {
  product: components["schemas"]["ProductResponse"];
  open: boolean;
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
});

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <UiAlertDialog :open="open">
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Confirm Purchase</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          Are you sure you want to buy "{{ product.title }}" for ${{
            product.purchasePrice
          }}?
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>

      <UiAlertDialogFooter>
        <UiAlertDialogCancel @click="$emit('cancel')"
          >Cancel</UiAlertDialogCancel
        >
        <UiAlertDialogAction :loading="isLoading" @click="$emit('confirm')"
          >Confirm Purchase</UiAlertDialogAction
        >
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
