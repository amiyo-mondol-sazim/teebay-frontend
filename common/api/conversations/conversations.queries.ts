import { useQuery } from "@tanstack/vue-query";
import { computed, type MaybeRef, unref } from "vue";
import { client } from "../client";
import { conversationKeys } from "./conversations.keys";

async function getConversations() {
  const { data, error } = await client.GET("/api/v1/conversations");
  if (error || !data) {
    toast.error("Failed to fetch conversations");
    throw error;
  }
  return data;
}

export function useConversationsListQuery() {
  return useQuery({
    queryKey: conversationKeys.lists(),
    queryFn: getConversations,
  });
}

async function getMessages(conversationId: number) {
  const { data, error } = await client.GET(
    "/api/v1/conversations/{conversationId}/messages",
    {
      params: {
        path: {
          conversationId,
        },
      },
    },
  );

  if (error || !data) {
    toast.error("Failed to fetch messages");
    throw error;
  }
  return data;
}

export function useMessagesListQuery(
  conversationId: MaybeRef<number>,
  enabled?: MaybeRef<boolean>,
) {
  return useQuery({
    queryKey: computed(() =>
      conversationKeys.messages(unref(conversationId).toString()),
    ),
    queryFn: () => getMessages(unref(conversationId)),
    enabled: enabled ?? true,
  });
}

async function getConversation(conversationId: number) {
  const { data, error } = await client.GET("/api/v1/conversations/{id}", {
    params: {
      path: {
        id: conversationId,
      },
    },
  });
  if (error || !data) {
    toast.error("Failed to fetch conversation");
    throw error;
  }
  return data;
}

export function useConversationQuery(
  conversationId: MaybeRef<number>,
  enabled?: MaybeRef<boolean>,
) {
  return useQuery({
    queryKey: computed(() =>
      conversationKeys.detail(unref(conversationId).toString()),
    ),
    queryFn: () => getConversation(unref(conversationId)),
    enabled: enabled ?? true,
  });
}
