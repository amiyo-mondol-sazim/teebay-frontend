<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { rentalPeriodOptions } from "../../add-products.constants";
import { addProductSchema } from "../../add-products.schemas";

const props = defineProps<{
  purchasePrice: number;
  rentPrice: number;
  rentalPeriod: string;
}>();

const emit = defineEmits<{
  (
    e: "update",
    values: {
      purchasePrice: number;
      rentPrice: number;
      rentalPeriod: "DAY" | "WEEK" | "MONTH";
    },
  ): void;
  (e: "submit" | "back"): void;
}>();

const schema = toTypedSchema(
  addProductSchema.pick({
    purchasePrice: true,
    rentPrice: true,
    rentalPeriod: true,
  }),
);

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: {
    purchasePrice: props.purchasePrice || undefined,
    rentPrice: props.rentPrice || undefined,
    rentalPeriod: props.rentalPeriod as "DAY" | "WEEK" | "MONTH",
  },
});

watch(
  values,
  (newValues) => {
    if (
      newValues.purchasePrice !== undefined &&
      newValues.rentPrice !== undefined &&
      newValues.rentalPeriod
    ) {
      emit("update", {
        purchasePrice: Number(newValues.purchasePrice),
        rentPrice: Number(newValues.rentPrice),
        rentalPeriod: newValues.rentalPeriod as "DAY" | "WEEK" | "MONTH",
      });
    }
  },
  { deep: true },
);

const onSubmit = handleSubmit(() => {
  emit("submit");
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="space-y-1">
      <h2 class="text-xl font-semibold text-gray-900">Pricing</h2>
      <p class="text-sm text-gray-500">Set your purchase and rental prices.</p>
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
      <div class="grid grid-cols-2 gap-4">
        <FormTextfield
          label="Purchase Price ($)"
          name="purchasePrice"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
        />
        <FormTextfield
          label="Rent Price ($)"
          name="rentPrice"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
        />
      </div>

      <FormSelect
        label="Rental Period"
        name="rentalPeriod"
        placeholder="Select rental period"
        :options="rentalPeriodOptions"
      />

      <div class="flex justify-between">
        <UiButton
          type="button"
          variant="outline"
          @click="emit('back')"
          class="cursor-pointer"
        >
          Back
        </UiButton>
        <UiButton type="submit" class="cursor-pointer"> Submit </UiButton>
      </div>
    </form>
  </div>
</template>
