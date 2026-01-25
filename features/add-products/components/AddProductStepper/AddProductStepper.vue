<script setup lang="ts">
import { useCreateProductMutation } from "~/common/api/products/products.mutations";
import type { TCreateProductInput } from "~/common/typedefs/products";
import Step1ImageUpload from "../Step1ImageUpload/Step1ImageUpload.vue";
import Step2BasicInfo from "../Step2BasicInfo/Step2BasicInfo.vue";
import Step3Categories from "../Step3Categories/Step3Categories.vue";
import Step4Pricing from "../Step4Pricing/Step4Pricing.vue";

const currentStep = ref(1);
const formData = reactive<TCreateProductInput>({
  title: "",
  description: "",
  categories: [],
  purchasePrice: 0,
  rentPrice: 0,
  rentalPeriod: ERentalPeriod.DAY,
  imageUrl: "",
});

const { mutate: createProduct } = useCreateProductMutation();

const handleUpdate = (data: Partial<TCreateProductInput>) => {
  Object.assign(formData, data);
};

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submit = () => {
  createProduct(formData);
};
</script>

<template>
  <UiCard class="w-full max-w-2xl mx-auto">
    <UiCardHeader>
      <div class="flex items-center justify-between mb-4 px-2">
        <div v-for="step in 4" :key="step" class="flex items-center flex-1">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors shrink-0"
            :class="[
              step === currentStep
                ? 'border-primary bg-primary text-primary-foreground'
                : step < currentStep
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-muted text-muted-foreground',
            ]"
          >
            {{ step }}
          </div>
          <div
            v-if="step < 4"
            class="h-0.5 mx-2 flex-1 transition-colors"
            :class="step < currentStep ? 'bg-primary' : 'bg-muted'"
          />
        </div>
      </div>
    </UiCardHeader>

    <UiCardContent>
      <Step1ImageUpload
        v-if="currentStep === 1"
        :image-url="formData.imageUrl || null"
        @update="(url) => handleUpdate({ imageUrl: url })"
        @next="nextStep"
      />

      <Step2BasicInfo
        v-if="currentStep === 2"
        :title="formData.title"
        :description="formData.description"
        @update="handleUpdate"
        @next="nextStep"
        @back="prevStep"
      />

      <Step3Categories
        v-if="currentStep === 3"
        :categories="formData.categories"
        @update="(cats) => handleUpdate({ categories: cats })"
        @next="nextStep"
        @back="prevStep"
      />

      <Step4Pricing
        v-if="currentStep === 4"
        :purchase-price="formData.purchasePrice"
        :rent-price="formData.rentPrice"
        :rental-period="formData.rentalPeriod"
        @update="handleUpdate"
        @submit="submit"
        @back="prevStep"
      />
    </UiCardContent>
  </UiCard>
</template>
