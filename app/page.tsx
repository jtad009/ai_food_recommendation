"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import { TABLET_BREAKPOINT } from "@/constants/chat";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= TABLET_BREAKPOINT); // md breakpoint
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isSidebarOpen === null) return null;

  return (
    <div className="flex flex-col h-screen bg-primary-600">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - always visible on desktop, collapsible on mobile */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex flex-col flex-1 md:m-3 ms-0">
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-hidden">
            <ChatInterface />
          </main>
        </div>
      </div>
    </div>
  );
}
