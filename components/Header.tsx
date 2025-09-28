import React from "react";
import { Menu, User } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-tertiary-100 md:rounded-t-xl h-16 flex items-center justify-between px-4 md:px-6 z-10">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-primary-600 focus:outline-none mr-4 md:hidden"
        >
          <Menu size={24} />
        </button>

        <div
          className={`flex items-center absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:translate-none`}
        >
          <div className="flex items-center">
            <span className="font-bold text-lg text-primary-700 hidden md:block">
              Recipe AI V1
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center">
            <User size={16} className="text-grey-100" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
