<script setup lang="ts">
import ConversationList from "~/features/conversations/components/ConversationList.vue";
import ConversationMessages from "~/features/conversations/components/ConversationMessages.vue";

const route = useRoute();
const conversationId = computed(() => {
  const id = route.query.conversationId;
  return id ? Number(id) : null;
});
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <div class="w-full md:w-[20%] border-r">
      <ConversationList :conversation-id="conversationId" />
    </div>
    <div class="w-full md:w-[80%]">
      <ConversationMessages :conversation-id="conversationId" />
    </div>
  </div>
</template>
