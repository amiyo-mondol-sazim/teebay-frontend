<script setup lang="ts">
import { formatDistanceToNow } from "date-fns";
import type { TNotification, ENotificationType } from "../notifications.types";
import { NOTIFICATION_TYPE_CONFIG } from "../notifications.types";

interface Props {
  notification: TNotification;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [notification: TNotification];
}>();

const config = computed(
  () => NOTIFICATION_TYPE_CONFIG[props.notification.type as ENotificationType],
);

const isUnread = computed(() => !props.notification.readAt);

const formattedDate = computed(() => {
  if (!props.notification.createdAt) return "";
  return formatDistanceToNow(new Date(props.notification.createdAt), {
    addSuffix: true,
  });
});

function handleClick() {
  emit("click", props.notification);
}
</script>

<template>
  <div
    class="group flex cursor-pointer items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
    :class="{ 'border-l-4 border-l-blue-500 bg-blue-500/5': isUnread }"
    @click="handleClick"
  >
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      :class="config.color"
    >
      <Icon :name="config.icon" class="h-5 w-5" />
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <h3
          class="font-medium truncate"
          :class="{
            'text-foreground': isUnread,
            'text-muted-foreground': !isUnread,
          }"
        >
          {{ notification.title }}
        </h3>
        <span class="shrink-0 text-xs text-muted-foreground">
          {{ formattedDate }}
        </span>
      </div>
      <p class="mt-1 text-sm text-muted-foreground line-clamp-2">
        {{ notification.body }}
      </p>
    </div>

    <div v-if="isUnread" class="shrink-0">
      <div class="h-2 w-2 rounded-full bg-blue-500" />
    </div>
  </div>
</template>
