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
    <UiAlertDialogContent class="gap-6 p-8 sm:max-w-140">
      <UiAlertDialogHeader class="pb-8">
        <UiAlertDialogTitle class="text-[1.375rem] font-bold">{{ title }}</UiAlertDialogTitle>
        <UiAlertDialogDescription class="text-base font-semibold text-gray-400">
          {{ description }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel as-child @click="emits('cancel')">
          <slot name="cancel">
            <UiButton variant="ghost" class="h-10.5 shadow-none"> {{ cancelText ?? 'Cancel' }} </UiButton>
          </slot>
        </UiAlertDialogCancel>
        <UiAlertDialogAction as-child @click="emits('action')">
          <slot name="action">
            <UiButton variant="primary" class="h-10.5"> {{ actionText ?? 'Save' }} </UiButton>
          </slot>
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
