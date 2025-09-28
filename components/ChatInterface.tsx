import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { generateChatId, getTextMessagesFromParts } from "@/lib/chat";
import { CHAT_STATUS } from "@/constants/chat";
import { useRouter, useSearchParams } from "next/navigation";
import useChatStore from "@/store/chatStore";
import EmptyChat from "./EmptyChat";

const ChatInterface = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatParam = searchParams.get("chat");
  const chatId = chatParam || generateChatId();
  const initialMessages = useChatStore((state) => state.messages[chatId]);
  const saveChat = useChatStore((state) => state.addMessages);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { messages, sendMessage, status } = useChat({
    id: chatId,
    messages: initialMessages,
    transport: new TextStreamChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
    }),
    onFinish: (message) => {
      saveChat(chatId, message.messages);
    },
  });

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight;
      setAutoScroll(isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (newMessage.trim() === "") return;
    if (chatId) {
      router.replace(`?chat=${chatId}`);
    }
  }, [chatId, router, newMessage]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    sendMessage({
      text: newMessage,
    });
    setNewMessage("");
    setAutoScroll(true);
  };

  const allMessages = getTextMessagesFromParts(messages);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col h-full bg-tertiary-100 rounded-b-xl">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
      >
        {!isLoading && allMessages.length === 0 && (
          <div className="space-y-4 md:px-10 xl:px-30 h-full">
            <EmptyChat onSuggestionClick={setNewMessage} />
          </div>
        )}
        {allMessages.length > 0 && (
          <div className="space-y-4 md:px-10 xl:px-30">
            {allMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isSender={message.isSender}
              />
            ))}
            {status === CHAT_STATUS.SUBMITTED && (
              <MessageBubble
                message={{ text: "Thinking..." }}
                isSender={false}
              />
            )}
            {status === CHAT_STATUS.ERROR && (
              <MessageBubble
                message={{ text: "An error occurred. Please try again later." }}
                isSender={false}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="pb-4 px-4 md:px-10 xl:px-30">
        <div className="relative">
          <input
            type="text"
            value={newMessage}
            id="chat-input"
            onChange={(e) => setNewMessage(e.target.value)}
            className="block w-full p-6 md:ps-10 text-sm text-primary-700 border border-tertiary-200 bg-tertiary-200/10 rounded-xl focus:outline-primary-500 focus:ring-primary-500"
            placeholder="Ask me anything about cooking, recipes, or ingredients..."
            required
          />
          <button
            type="submit"
            className="cursor-pointer text-grey-100 absolute end-3 bottom-3 bg-primary-600 enabled:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-3 py-3 disabled:bg-primary-500 disabled:cursor-not-allowed"
            disabled={
              status === CHAT_STATUS.SUBMITTED || newMessage.trim() === ""
            }
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
