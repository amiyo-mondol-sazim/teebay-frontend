<script setup lang="ts">
import ConversationList from "~/features/conversations/components/ConversationList.vue";
import ConversationMessages from "~/features/conversations/components/ConversationMessages.vue";
</script>

<template>
  <div class="flex h-[calc(100vh-4rem)]">
    <div class="w-full md:w-[20%] border-r">
      <ConversationList />
    </div>
    <div class="w-full md:w-[80%]">
      <ConversationMessages />
    </div>
  </div>
</template>
