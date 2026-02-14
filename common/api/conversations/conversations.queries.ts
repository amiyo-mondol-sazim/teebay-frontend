import { useQuery } from '@tanstack/vue-query';
import { client } from '../client';
import { conversationKeys } from './conversations.keys';

export function useConversationsList() {
  return useQuery({
    queryKey: conversationKeys.lists(),
    queryFn: () => client.GET('/api/v1/conversations'),
  });
}
