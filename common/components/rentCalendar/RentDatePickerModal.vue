<script setup lang="ts">

import RentCostPreview from "./RentCostPreview.vue";
import RentDateSelector from "./RentDateSelector.vue";

interface Props {
  product: TProductResponse;
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

const dateState = useRentDateState({
  rentPrice: props.product.rentPrice,
  rentalPeriod: props.product.rentalPeriod,
});

const handleConfirm = () => {
  if (!dateState.validate()) return;
  emit("confirm", dateState.getConfirmData());
};

const handleCancel = () => emit("cancel");
</script>

<template>
  <UiDialog :open="open" @update:open="handleCancel">
    <UiDialogContent
      class="gap-0 p-0 overflow-hidden border-0 shadow-2xl [&_[data-dialog-description]]:hidden"
    >
      <div class="relative bg-primary p-6 text-white">
        <UiDialogHeader class="relative">
          <UiDialogTitle
            class="text-2xl font-semibold tracking-tight text-white"
          >
            Rent {{ product.title }}
          </UiDialogTitle>
          <UiDialogDescription class="text-indigo-100 mt-1">
            Select your rental period
          </UiDialogDescription>
        </UiDialogHeader>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid sm:grid-cols-2 gap-4">
          <RentDateSelector
            label="Start Date"
            :date="dateState.startDate.value"
            :min-value="dateState.minValue"
            :is-open="false"
            :is-date-disabled="dateState.isDateDisabled"
            :error="dateState.errors.value.startDate"
            indicator-color="bg-indigo-500"
            hover-color="border-indigo-300 text-indigo-700"
            @update:date="dateState.handleStartDateSelect"
          />

          <RentDateSelector
            label="End Date"
            :date="dateState.endDate.value"
            :min-value="dateState.startDate.value ?? dateState.minValue"
            :is-open="false"
            :is-date-disabled="dateState.isEndDateDisabled"
            :error="dateState.errors.value.endDate"
            :disabled="!dateState.startDate.value"
            indicator-color="bg-pink-500"
            hover-color="border-pink-300 text-pink-700"
            @update:date="dateState.handleEndDateSelect"
          />
        </div>

        <RentCostPreview
          :total-cost="dateState.totalRentingCost.value"
          :duration="dateState.rentalDuration.value"
          :daily-rate="dateState.dailyRate.value"
        />
      </div>

      <UiDialogFooter class="p-6 pt-0 gap-3 sm:gap-3">
        <UiButton
          variant="outline"
          class="flex-1 h-11 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
          @click="handleCancel"
        >
          Cancel
        </UiButton>
        <UiButton
          :loading="isLoading"
          :disabled="!dateState.startDate.value || !dateState.endDate.value"
          class="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleConfirm"
        >
          Confirm Rent
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
