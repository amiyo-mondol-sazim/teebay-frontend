export const conversationKeys = {
  all: ['conversations'] as const,
  lists: () => [...conversationKeys.all, 'list'] as const,
  messages: (id: string) => [...conversationKeys.all, 'messages', id] as const,
};
