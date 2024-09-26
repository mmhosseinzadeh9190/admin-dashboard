import {
  Calendar,
  Clock,
  Code,
  Element3,
  Messages3,
  Setting2,
} from "iconsax-react";
import NavItem from "./NavItem";

const navItems = [
  {
    to: "/dashboard",
    icon: <Element3 size="20" variant="Linear" />,
    label: "Dashboard",
  },
  {
    to: "/messages",
    icon: <Messages3 size="20" variant="Linear" />,
    label: "Messages",
  },
  {
    to: "/projects",
    icon: <Code size="20" variant="Linear" />,
    label: "Projects",
  },
  {
    to: "/schedule",
    icon: <Calendar size="20" variant="Linear" />,
    label: "Schedule",
  },
  {
    to: "/activity",
    icon: <Clock size="20" variant="Linear" />,
    label: "Activity",
  },
  {
    to: "/settings",
    icon: <Setting2 size="20" variant="Linear" />,
    label: "Settings",
  },
];

function MainNav() {
  return (
    <nav>
      <ul className="flex h-full flex-col gap-2">
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
