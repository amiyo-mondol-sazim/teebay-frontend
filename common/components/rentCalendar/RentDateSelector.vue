<script setup lang="ts">
import type { DateValue } from "@internationalized/date";

interface Props {
  label: string;
  date: DateValue | undefined;
  error?: string;
  minValue: DateValue;
  isOpen: boolean;
  disabled?: boolean;
  isDateDisabled: (date: DateValue) => boolean;
  indicatorColor: string;
  hoverColor: string;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  "update:date": [date: DateValue | undefined];
  "update:isOpen": [value: boolean];
}>();

const formatDate = (date: DateValue | undefined): string => {
  if (!date) return "Select date";
  return date.toDate("UTC").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const handleDateSelect = (date: DateValue | undefined) => {
  if (!date) return;
  emit("update:date", date);
  emit("update:isOpen", false);
};
</script>

<template>
  <div class="space-y-2">
    <label
      class="text-sm font-semibold text-slate-700 flex items-center gap-2"
    >
      <span
        class="w-2 h-2 rounded-full"
        :class="indicatorColor"
      ></span>
      {{ label }}
    </label>
    <UiPopover :open="isOpen" @update:open="emit('update:isOpen', $event)">
      <PopoverTrigger as-child>
        <UiButton
          variant="outline"
          :disabled="disabled"
          :class="[
            'w-full justify-start text-left font-normal h-12 transition-all',
            'border-slate-200',
            `hover:${hoverColor} hover:bg-opacity-50`,
            date && `${hoverColor} bg-opacity-50`,
          ]"
        >
          <span class="flex-1">{{ formatDate(date) }}</span>
          <Icon name="ph:calendar-blank" class="w-5 h-5 text-slate-400" />
        </UiButton>
      </PopoverTrigger>
      <PopoverContent
        class="p-0 border-slate-200 shadow-xl"
        align="start"
      >
        <UiCalendar
          :model-value="date"
          :min-value="minValue"
          :is-date-disabled="isDateDisabled"
          initial-focus
          class="rounded-lg"
          @update:model-value="handleDateSelect"
        />
      </PopoverContent>
    </UiPopover>
    <p
      v-if="error"
      class="text-sm text-red-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <Icon name="ph:warning-circle" class="w-4 h-4" />
      {{ error }}
    </p>
  </div>
</template>
