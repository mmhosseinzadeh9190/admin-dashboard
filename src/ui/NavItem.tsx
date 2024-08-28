import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-md px-6 py-3 tracking-0.1 hover:bg-gray-100 ${isActive ? "bg-gray-100 font-semibold text-primary-800" : "text-gray-900"}`
        }
      >
        <span className="text-gray-600">{icon}</span>
        <span className="mb-[-1px]">{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
