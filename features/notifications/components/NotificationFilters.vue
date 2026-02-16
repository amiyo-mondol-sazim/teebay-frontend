<script setup lang="ts">
import {
  ENotificationStatusFilter,
  ENotificationTypeFilter,
} from "../notifications.types";

interface Props {
  typeFilter: ENotificationTypeFilter;
  statusFilter: ENotificationStatusFilter;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:typeFilter": [value: ENotificationTypeFilter];
  "update:statusFilter": [value: ENotificationStatusFilter];
}>();

const typeFilterModel = computed({
  get: () => props.typeFilter,
  set: (value) => emit("update:typeFilter", value),
});

const statusFilterModel = computed({
  get: () => props.statusFilter,
  set: (value) => emit("update:statusFilter", value),
});

const typeOptions = [
  { value: ENotificationTypeFilter.ALL, label: "All Types" },
  { value: ENotificationTypeFilter.MESSAGE, label: "Messages" },
  { value: ENotificationTypeFilter.RENT_REQUEST, label: "Rents" },
  { value: ENotificationTypeFilter.SALE_REQUEST, label: "Sales" },
];

const statusOptions = [
  { value: ENotificationStatusFilter.ALL, label: "All" },
  { value: ENotificationStatusFilter.UNREAD, label: "Unread" },
  { value: ENotificationStatusFilter.READ, label: "Read" },
];
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        v-for="option in typeOptions"
        :key="option.value"
        class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
        :class="
          typeFilterModel === option.value
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        "
        @click="typeFilterModel = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        v-for="option in statusOptions"
        :key="option.value"
        class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
        :class="
          statusFilterModel === option.value
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        "
        @click="statusFilterModel = option.value"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
