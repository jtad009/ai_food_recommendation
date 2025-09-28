import { deleteChat, getStoredChats, saveChat } from "@/lib/chat";
import { UIMessage, UIDataTypes, UITools } from "ai";
import { create } from "zustand";
interface ChatState {
  messages: Record<string, UIMessage<unknown, UIDataTypes, UITools>[]>;
  addMessages: (
    chatId: string,
    msgs: UIMessage<unknown, UIDataTypes, UITools>[]
  ) => void;
  deleteChat: (chatId: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: getStoredChats(),
  addMessages: (
    chatId: string,
    msgs: UIMessage<unknown, UIDataTypes, UITools>[] = []
  ) => {
    if (!chatId) return;
    saveChat(chatId, msgs);
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: msgs,
      },
    }));
  },
  deleteChat: (chatId: string) => {
    if (!chatId) return;
    deleteChat(chatId);
    set((state) => {
      const { [chatId]: _, ...rest } = state.messages;
      return { messages: rest };
    });
  },
}));

export default useChatStore;
