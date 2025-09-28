import { LOCAL_STORAGE_KEY } from "@/constants/chat";
import { ChatPart } from "@/types/chat";
import { UIMessage, UIDataTypes, UITools, generateId } from "ai";

export const getTextMessagesFromParts = (
  messages: UIMessage<unknown, UIDataTypes, UITools>[]
) => {
  return messages.flatMap(
    (message: UIMessage<unknown, UIDataTypes, UITools>) => {
      // Get all text parts
      const textParts =
        message.parts?.filter((p: ChatPart) => p.type === "text") || [];
      return textParts.map((textPart: ChatPart) => {
        let text = textPart.text || "";
        // If assistant, try to parse JSON response
        if (message.role === "assistant") {
          if (
            typeof text === "string" &&
            (text.trim().startsWith("{") || text.trim().startsWith("["))
          ) {
            try {
              const parsed = JSON.parse(text);
              text =
                parsed.response || "I didn't get that. Could you rephrase?";
            } catch {
              text = "Something went wrong. Please try again.";
            }
          }
        }
        return {
          id: message.id,
          text,
          isSender: message.role === "user",
        };
      });
    }
  );
};

export function generateChatId() {
  return generateId();
}

export function getStoredChats() {
  if (typeof window === "undefined") return {};
  const storedMessages = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );
  return storedMessages;
}

export function saveChat(
  id: string,
  messages: UIMessage<unknown, UIDataTypes, UITools>[]
) {
  if (!id) return;
  const chats = getStoredChats();
  chats[id] = messages;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chats));
}

export function deleteChat(id: string) {
  const chats = getStoredChats();
  if (chats[id]) {
    delete chats[id];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chats));
  }
}
