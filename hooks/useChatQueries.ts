import { chatService } from "@/services/chat-service";
import { useQuery } from "@tanstack/react-query";

export const chatKeys = {
  all: ["chat"] as const,
};

// TODO: DELETE and replace with actual hook implementation
export function useChatMessage() {
  return useQuery({
    queryKey: chatKeys.all,
    queryFn: chatService.getMessage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}
