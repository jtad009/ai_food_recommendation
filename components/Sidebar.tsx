import React from "react";
import { User, SquarePen, X, PanelLeftClose, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import RecentChats from "./RecentChats";
import { TABLET_BREAKPOINT } from "@/constants/chat";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar = () => {} }: SidebarProps) => {
  const router = useRouter();

  const handleNewChat = () => {
    router.push(`/`);
    if (
      typeof window !== "undefined" &&
      window.innerWidth < TABLET_BREAKPOINT &&
      toggleSidebar
    ) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-950 opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`bg-primary-600 shadow-md h-full fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
         md:static md:block md:transform-none md:translate-none md:z-auto
         ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-20"}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="px-4">
            <div className="flex items-center justify-between py-3">
              {isOpen && (
                <div className="bg-secondary-100 p-2.5 rounded-2xl">
                  <ChefHat size={20} className="text-primary-600" />
                </div>
              )}
              <button
                className="text-grey-200 hover:text-grey-300 cursor-pointer px-2"
                onClick={toggleSidebar}
              >
                <PanelLeftClose className="hidden md:block" />
                <X className="md:hidden" />
              </button>
            </div>

            <nav className="flex-1 py-4">
              <button
                onClick={handleNewChat}
                className={`flex items-center text-secondary-100 hover:bg-primary-500 transition-colors rounded-lg cursor-pointer
                  ${isOpen ? "gap-3 ps-2 py-3 w-full" : "w-fit p-2"}`}
              >
                <SquarePen size={20} className="text-secondary-100" />
                {isOpen && <span>New Chat</span>}
              </button>
              {isOpen && (
                <div className="ps-2 py-2 text-sm font-semibold text-grey-200">
                  Recent Chats
                </div>
              )}
              {isOpen && <RecentChats toggleSidebar={toggleSidebar} />}
            </nav>
          </div>

          <div className="p-4 border-t border-tertiary-400 md:hidden">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                <User size={16} className="text-primary-700" />
              </div>
              <span className="ml-2 text-grey-200 font-medium">User Name</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
