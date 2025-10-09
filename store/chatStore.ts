import {
  deleteChat,
  deleteChatSummary,
  getStoredChats,
  getStoredChatSummary,
  saveChat,
  saveChatSummary,
} from "@/lib/chat";
import { UIMessage, UIDataTypes, UITools } from "ai";
import { create } from "zustand";
interface ChatState {
  messages: Record<string, UIMessage<unknown, UIDataTypes, UITools>[]>;
  summaries: Record<string, string>;
  addMessages: (
    chatId: string,
    msgs: UIMessage<unknown, UIDataTypes, UITools>[]
  ) => void;
  deleteChat: (chatId: string) => void;
  addChatSummary: (chatId: string, summary: string) => void;
  deleteChatSummary: (chatId: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: getStoredChats(),
  summaries: getStoredChatSummary(),
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
  addChatSummary: (chatId: string, summary: string) => {
    if (!chatId) return;
    saveChatSummary(chatId, summary);
    set((state) => ({
      summaries: {
        ...state.summaries,
        [chatId]: summary,
      },
    }));
  },
  deleteChatSummary: (chatId: string) => {
    if (!chatId) return;
    deleteChatSummary(chatId);
    set((state) => {
      const { [chatId]: _, ...rest } = state.summaries;
      return { summaries: rest };
    });
  },
}));

export default useChatStore;
