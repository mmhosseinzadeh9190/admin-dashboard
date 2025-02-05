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
          `group flex items-center gap-3 rounded-lg px-5 py-3 text-base/4 font-medium tracking-0.1 hover:bg-gray-100 hover:text-gray-800 focus:outline-none ${isActive ? "bg-gray-100 text-gray-800" : "text-gray-700"}`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`${isActive ? "text-primary-800" : "text-gray-600"} group-hover:text-primary-800`}
            >
              {icon}
            </span>
            <span>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

export default NavItem;
