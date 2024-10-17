import { useState } from "react";
import { CloseCircle, HambergerMenu } from "iconsax-react";
import Button from "./Button";
import { iconColor } from "../styles/GlobalStyles";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Logout from "../features/authentication/Logout";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="row-span-full flex border-r border-gray-200 p-5">
      <Button
        className="p-2 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <HambergerMenu size="28" color={iconColor} variant="Bulk" />
      </Button>

      <div
        className={`fixed left-0 top-0 flex transform flex-col gap-8 bg-white text-gray-900 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-56 max-w-56 md:relative md:translate-x-0 md:translate-y-0`}
      >
        <Button
          className="absolute right-4 top-4 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <CloseCircle size="28" color={iconColor} variant="Bulk" />
        </Button>

        <Logo />
        <MainNav />
        <Logout />
      </div>
    </aside>
  );
}

export default Sidebar;
