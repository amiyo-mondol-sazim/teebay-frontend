<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  actionText?: string;
  cancelText?: string;
}>();
const emits = defineEmits<{ action: []; cancel: [] }>();
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <slot>
        <UiButton type="button" class="h-10">
          {{ actionText }}
        </UiButton>
      </slot>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent class="gap-6 p-8 sm:max-w-lg">
      <UiAlertDialogHeader class="pb-8">
        <UiAlertDialogTitle class="text-xl font-bold">{{
          title
        }}</UiAlertDialogTitle>
        <UiAlertDialogDescription class="text-muted-foreground text-base">
          {{ description }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel as-child @click="emits('cancel')">
          <slot name="cancel">
            <UiButton variant="outline" class="h-10.5">
              {{ cancelText ?? "Cancel" }}
            </UiButton>
          </slot>
        </UiAlertDialogCancel>
        <UiAlertDialogAction as-child @click="emits('action')">
          <slot name="action">
            <UiButton variant="destructive" class="h-10.5">
              {{ actionText ?? "Save" }}
            </UiButton>
          </slot>
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
