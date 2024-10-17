import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "./Button";

interface Item {
  icon: JSX.Element;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface CustomDropdownProps {
  items: Item[];
}

function CustomDropdown({ items }: CustomDropdownProps) {
  return (
    <Menu>
      <MenuButton className="select-none py-1 focus:outline-none">
        <img src="/src/assets/ellipsis.svg" alt="Options" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        transition
        className="z-30 mt-1 w-44 origin-top-right rounded-lg border border-gray-200 bg-white p-1 font-roboto text-sm tracking-0.1 text-gray-700 shadow-[0_5px_15px_0] shadow-gray-800/10 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.label}>
              <Button
                className="group flex w-full items-center gap-2 rounded-md px-3 py-1.5 hover:bg-gray-200"
                onClick={item.onClick}
              >
                <span className="text-gray-600 group-hover:text-gray-700">
                  {item.icon}
                </span>
                <span className="group-hover:text-gray-800">{item.label}</span>
              </Button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
export default CustomDropdown;
