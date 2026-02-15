<script setup lang="ts">
import { computed } from "vue";

type MessageResponse = components["schemas"]["MessageResponse"];
type MessageSenderResponse = components["schemas"]["MessageSenderResponse"];

interface Props {
  message: MessageResponse;
  isFromCurrentUser: boolean;
  showAvatar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showAvatar: true,
});

const senderInitials = computed(() => {
  const email = props.message.sender.email;
  const name = email.split("@")[0];
  return name?.slice(0, 2).toUpperCase();
});

const formattedTime = computed(() => {
  const date = new Date(props.message.createdAt);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});

const isRead = computed(() => !!props.message.readAt);
</script>

<template>
  <div
    class="flex flex-col gap-1"
    :class="props.isFromCurrentUser ? 'items-end' : 'items-start'"
  >
    <div
      class="flex gap-3 max-w-[85%] items-center"
      :class="props.isFromCurrentUser ? 'ml-auto flex-row-reverse' : 'mr-auto'"
    >
      <div
        v-if="!props.isFromCurrentUser && props.showAvatar"
        class="flex-shrink-0"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary"
        >
          {{ senderInitials }}
        </div>
      </div>
      <div
        class="flex flex-col gap-1 items-center"
        :class="props.isFromCurrentUser ? 'items-end' : 'items-start'"
      >
        <div
          class="relative rounded-2xl px-4 py-2.5 shadow-sm"
          :class="
            props.isFromCurrentUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          "
        >
          <p class="text-sm leading-relaxed whitespace-pre-wrap">
            {{ props.message.content }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center gap-2"
    >
      <span class="text-xs text-muted-foreground/70">
        {{ formattedTime }}
      </span>
      <span
        v-if="props.isFromCurrentUser && isRead"
        class="flex items-center text-xs text-primary"
      >
        <Icon name="ph:check-circle-fill" class="h-3.5 w-3.5" />
      </span>
    </div>
  </div>
</template>
