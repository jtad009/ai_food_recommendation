import { ChatMessageResponse } from "@/types/chat";
import { api } from "./api-client";
import { CHAT } from "./endpoints";

export const chatService = {
  // TODO: Implement chat service methods, and delete this placeholder
  getMessage: async (): Promise<ChatMessageResponse> => {
    const response = await api.get<ChatMessageResponse>(CHAT.ROOT);
    return response;
  },
};
