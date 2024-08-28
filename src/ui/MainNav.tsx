import {
  Calendar,
  Clock,
  Code1,
  Element3,
  Logout,
  Messages3,
  Setting2,
} from "iconsax-react";
import NavItem from "./NavItem";

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

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
