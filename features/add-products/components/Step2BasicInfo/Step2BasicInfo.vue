<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { addProductSchema } from "../../add-products.schemas";

const props = defineProps<{
  title: string;
  description: string;
}>();

const emit = defineEmits<{
  (e: "update", values: { title: string; description: string }): void;
  (e: "next" | "back"): void;
}>();

const schema = toTypedSchema(
  addProductSchema.pick({ title: true, description: true }),
);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    title: props.title,
    description: props.description,
  },
});

const [titleRef, titleProps] = defineField("title");
const [descriptionRef, descriptionProps] = defineField("description");

watch([titleRef, descriptionRef], ([newTitle, newDesc]) => {
  emit("update", {
    title: newTitle || "",
    description: newDesc || "",
  });
});

const onNext = handleSubmit(() => {
  emit("next");
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="space-y-1">
      <h2 class="text-xl font-semibold text-gray-900">Basic Information</h2>
      <p class="text-sm text-gray-500">
        Describe your product clearly to attract renters.
      </p>
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="onNext">
      <div class="space-y-2">
        <UiLabel for="title">Title</UiLabel>
        <UiInput
          id="title"
          v-model="titleRef"
          v-bind="titleProps"
          placeholder="e.g. Professional DSLR Camera"
        />
        <p v-if="errors.title" class="text-sm text-destructive">
          {{ errors.title }}
        </p>
      </div>

      <div class="space-y-2">
        <UiLabel for="description">Description</UiLabel>
        <UiTextarea
          id="description"
          v-model="descriptionRef"
          v-bind="descriptionProps"
          placeholder="Describe features, condition, and what's included..."
          :rows="4"
        />
        <p v-if="errors.description" class="text-sm text-destructive">
          {{ errors.description }}
        </p>
      </div>

      <div class="flex justify-between">
        <UiButton
          type="button"
          variant="outline"
          class="cursor-pointer"
          @click="emit('back')"
        >
          Back
        </UiButton>
        <UiButton type="submit" class="cursor-pointer"> Next </UiButton>
      </div>
    </form>
  </div>
</template>
