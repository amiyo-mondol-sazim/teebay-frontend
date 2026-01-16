<script setup lang="ts">
import { computed, ref } from "vue";

import dayjs from "dayjs";

import type { components } from "~/common/typedefs/api-schema";

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

const errors = ref<{ startDate?: string; endDate?: string }>({});

const totalCost = computed(() => {
  if (!startDate.value || !endDate.value) return 0;
  const start = dayjs(startDate.value);
  const end = dayjs(endDate.value);
  if (!start.isValid() || !end.isValid() || start.isAfter(end)) return 0;
  const days = end.diff(start, "day") + 1; // inclusive
  return days * props.product.rentPrice;
});

const validate = () => {
  errors.value = {};
  if (!startDate.value) errors.value.startDate = "Start date is required";
  if (!endDate.value) errors.value.endDate = "End date is required";
  if (startDate.value && endDate.value) {
    const start = dayjs(startDate.value);
    const end = dayjs(endDate.value);
    if (start.isAfter(end)) {
      errors.value.endDate = "End date must be after start date";
    }
  }
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

        <div v-if="totalCost > 0" class="rounded-lg bg-muted p-4">
          <p class="text-sm text-muted-foreground">Estimated Total Cost</p>
          <p class="text-lg font-bold">${{ totalCost }}</p>
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
