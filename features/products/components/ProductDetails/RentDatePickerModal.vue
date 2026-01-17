<script setup lang="ts">
import { computed, ref } from "vue";

import type { components } from "~/common/typedefs/api-schema";
import {
  calculateRentalCost,
  getRentPricePerDay,
  validateRentalDates,
  type RentalDateErrors,
} from "./product-details.helper";

interface Props {
  product: components["schemas"]["ProductResponse"];
  open: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const emit = defineEmits<{
  confirm: [dates: { startDate: string; endDate: string }];
  cancel: [];
}>();

const startDate = ref("");
const endDate = ref("");

const errors = ref<RentalDateErrors>({});

const totalRentingCost = computed(() => {
  const rentPricePerDay = getRentPricePerDay(
    props.product.rentPrice,
    props.product.rentalPeriod
  );
  return calculateRentalCost(startDate.value, endDate.value, rentPricePerDay);
});

const validate = () => {
  const validationErrors = validateRentalDates(startDate.value, endDate.value);
  errors.value = validationErrors;
  return Object.keys(errors.value).length === 0;
};

const handleConfirm = () => {
  if (!validate()) return;
  emit("confirm", { startDate: startDate.value, endDate: endDate.value });
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<template>
  <UiDialog :open="open" @update:open="handleCancel">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Rent {{ product.title }}</UiDialogTitle>
        <UiDialogDescription>Select your rental dates</UiDialogDescription>
      </UiDialogHeader>

      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">Start Date</label>
          <UiInput v-model="startDate" type="date" />
          <p v-if="errors.startDate" class="text-sm text-destructive">
            {{ errors.startDate }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium">End Date</label>
          <UiInput v-model="endDate" type="date" />
          <p v-if="errors.endDate" class="text-sm text-destructive">
            {{ errors.endDate }}
          </p>
        </div>

        <div v-if="totalRentingCost > 0" class="rounded-lg bg-muted p-4">
          <p class="text-sm text-muted-foreground">Estimated Total Cost</p>
          <p class="text-lg font-bold">${{ totalRentingCost }}</p>
        </div>
      </div>

      <UiDialogFooter>
        <UiButton variant="outline" @click="handleCancel">Cancel</UiButton>
        <UiButton :loading="isLoading" @click="handleConfirm"
          >Confirm Rent</UiButton
        >
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
