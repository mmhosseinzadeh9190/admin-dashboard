import { CloseCircle, HambergerMenu } from "iconsax-react";
import { useState } from "react";
import MainNav from "./MainNav";
import UserTeams from "./UserTeams";
import { iconColor } from "../styles/GlobalStyles";
import Logo from "./Logo";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="row-span-full flex border-r-[1px] border-gray-200 p-6">
      <button
        className="p-2 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        type="button"
      >
        <HambergerMenu size={32} color={iconColor} variant="Bulk" />
      </button>

      <div
        className={`fixed left-0 top-0 h-full transform bg-white text-gray-900 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-56 max-w-56 md:relative md:translate-x-0 md:translate-y-0`}
      >
        <button
          className="absolute right-4 top-4 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          type="button"
        >
          <CloseCircle size={32} color={iconColor} variant="Bulk" />
        </button>

        <Logo />
        <UserTeams />
        <MainNav />
      </div>
    </aside>
  );
}

export default Sidebar;
