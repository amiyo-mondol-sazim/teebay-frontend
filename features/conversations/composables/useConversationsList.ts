import { useConversationsList as useConversationsListQuery } from "~/common/api/conversations/conversations.queries";

export function useConversationsList() {
  return useConversationsListQuery();
}
