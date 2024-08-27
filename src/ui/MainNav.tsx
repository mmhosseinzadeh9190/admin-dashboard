import {
  Calendar,
  Clock,
  Code1,
  Element3,
  Logout,
  Messages3,
  Setting2,
} from "iconsax-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard",
    icon: <Element3 size="24" variant="Bulk" />,
    label: "Dashboard",
  },
  {
    to: "/messages",
    icon: <Messages3 size="24" variant="Bulk" />,
    label: "Messages",
  },
  {
    to: "/projects",
    icon: <Code1 size="24" variant="Bulk" />,
    label: "Projects",
  },
  {
    to: "/schedule",
    icon: <Calendar size="24" variant="Bulk" />,
    label: "Schedule",
  },
  {
    to: "/activity",
    icon: <Clock size="24" variant="Bulk" />,
    label: "Activity",
  },
  {
    to: "/settings",
    icon: <Setting2 size="24" variant="Bulk" />,
    label: "Settings",
  },
  {
    to: "/login",
    icon: <Logout size="24" variant="Bulk" />,
    label: "Logout",
  },
];

interface RenderNavItem {
  to: string;
  icon: JSX.Element;
  label: string;
}

function MainNav() {
  const renderNavItem = ({ to, icon, label }: RenderNavItem) => {
    return (
      <li key={to}>
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-6 py-3 tracking-0.1 hover:bg-gray-100 ${isActive ? "bg-gray-100 font-semibold text-primary-800" : "text-gray-900"}`
          }
        >
          <span className="text-gray-600">{icon}</span>
          <span className="mb-[-1px]">{label}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <nav>
      <ul className="flex flex-col gap-2">{navItems.map(renderNavItem)}</ul>
    </nav>
  );
}

export default MainNav;
