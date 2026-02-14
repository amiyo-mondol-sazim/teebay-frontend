import { describe, it, expect } from 'vitest';
import { conversationKeys } from '~/common/api/conversations/conversations.keys';

describe('conversationKeys', () => {
  it('should have all base key', () => {
    expect(conversationKeys.all).toEqual(['conversations'] as const);
  });

  it('should generate list key', () => {
    expect(conversationKeys.lists()).toEqual(['conversations', 'list'] as const);
  });

  it('should generate messages key with id', () => {
    const id = '123';
    expect(conversationKeys.messages(id)).toEqual(['conversations', 'messages', id] as const);
  });
});
