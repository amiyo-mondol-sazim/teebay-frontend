import { useQuery } from "@tanstack/vue-query";
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
