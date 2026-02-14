import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { conversationKeys } from "./conversations.keys";
import type { components } from "~/common/typedefs/api-schema";

type CreateMessageDto = components["schemas"]["CreateMessageDto"];
type CreateConversationDto = components["schemas"]["CreateConversationDto"];

const createConversation = async (data: CreateConversationDto) => {
  const { data: response, error } = await client.POST("/api/v1/conversations", {
    body: data,
  });
  if (error || !response) {
    throw new Error(error?.message || "Failed to create conversation");
  }
  return response;
};

export function useCreateConversationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conversationKeys.all });
      toast.success("Conversation created!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create conversation");
    },
  });
}

const sendMessage = async (
  data: CreateMessageDto & { conversationId: number },
) => {
  const { data: response, error } = await client.POST(
    "/api/v1/conversations/{conversationId}/messages",
    {
      params: { path: { conversationId: data.conversationId } },
      body: { content: data.content },
    },
  );
  if (error || !response) {
    throw new Error(error?.message || "Failed to send message");
  }
  return response;
};

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.messages(String(variables.conversationId)),
      });
      toast.success("Message sent!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send message");
    },
  });
}
