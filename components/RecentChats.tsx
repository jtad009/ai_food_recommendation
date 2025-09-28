import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Trash } from "lucide-react";
import useChatStore from "@/store/chatStore";
import { TABLET_BREAKPOINT } from "@/constants/chat";

interface RecentChatsProps {
  toggleSidebar?: () => void;
}
const RecentChats = ({ toggleSidebar = () => {} }: RecentChatsProps) => {
  const router = useRouter();
  const chatMessages = useChatStore((state) => state.messages);
  const searchParams = useSearchParams();
  const activeChat = searchParams.get("chat");

  const deleteChat = useChatStore((state) => state.deleteChat);

  const handleDelete = (key: string) => {
    deleteChat(key);
    if (activeChat === key) {
      router.replace("/");
    }
  };

  const onRecentChatClick = () => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth < TABLET_BREAKPOINT
    ) {
      toggleSidebar();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(chatMessages)
        .reverse()
        .map(([key]) => (
          <div
            className={`group flex justify-between px-2 py-3 transition-colors cursor-pointer rounded-lg ${
              activeChat === key
                ? "bg-secondary-200 text-primary-700"
                : "hover:bg-primary-500 text-grey-100"
            }`}
            key={key}
          >
            <Link href={`/?chat=${key}`} onClick={onRecentChatClick}>
              <span>{key}</span>
            </Link>
            <button
              className="cursor-pointer invisible group-hover:visible"
              onClick={() => handleDelete(key)}
            >
              <Trash size={16} className="text-inherit" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default RecentChats;
