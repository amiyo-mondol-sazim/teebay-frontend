<script setup lang="ts">
import { onMounted } from "vue";
import ConversationsContainer from "~/features/conversations/containers/ConversationsContainer.vue";
import { useConversationsListQuery } from "~/common/api/conversations/conversations.queries";
import { useQueryClient } from "@tanstack/vue-query";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

onMounted(async () => {
  if (!route.query.conversationId) {
    const conversations = await queryClient.fetchQuery({
      queryKey: ["conversations"],
      queryFn: async () => {
        const response = await fetch("/api/conversations");
        if (!response.ok) throw new Error("Failed to fetch conversations");
        return response.json();
      },
    });

    if (conversations && conversations.length > 0) {
      await router.replace(`/conversations?conversationId=${conversations[0].id}`);
    }
  }
});
</script>

<template>
  <ConversationsContainer />
</template>
