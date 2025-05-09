import { useState } from "react";
import { User } from "../services/apiUsers";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ArrowDown2 } from "iconsax-react";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../utils/helpers";
import { iconColor } from "../styles/GlobalStyles";

interface CustomUsersSelectProps {
  members: User[];
  onUserSelect: (member: User) => void;
  disabled: boolean;
  fullWidth?: boolean;
}

function CustomUsersSelect({
  members,
  onUserSelect,
  disabled,
  fullWidth,
}: CustomUsersSelectProps) {
  const [selected, setSelected] = useState(members[0]);

  const placeholderAvatar = "/public/avatarPlaceholder.png";

  const handleChange = (member: User) => {
    setSelected(member);
    onUserSelect(member);
  };

  return (
    <div className={fullWidth ? "w-full" : "w-52"}>
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton
          disabled={disabled}
          className={`relative flex w-full items-center gap-2.5 border border-gray-200 pl-3.5 pr-10 focus:outline-none disabled:cursor-not-allowed ${fullWidth ? "rounded-xl bg-gray-100 py-2.5 disabled:bg-gray-200" : "rounded-lg bg-white py-2 disabled:bg-gray-100"}`}
        >
          <img
            src={selected.avatar_url || placeholderAvatar}
            alt=""
            onError={(e) => addDefaultSrc(e, "avatar")}
            className="h-5 w-5 rounded-full border border-gray-200 object-cover object-center"
          />
          <span className="truncate font-roboto text-sm tracking-0.1 text-gray-800">
            {capitalizeAllFirstLetters(selected.name!)}
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute right-3.5 ${fullWidth ? "top-3" : "top-2.5"}`}
          >
            <ArrowDown2 size="16" color={iconColor} variant="Linear" />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="top"
          transition
          className="z-30 -mt-2.5 w-[var(--button-width)] rounded-lg border border-gray-200 bg-white p-1 shadow-[0_5px_15px_0] shadow-gray-800/10 focus:outline-none"
        >
          {members.map((member) => (
            <ListboxOption
              key={member.id}
              value={member}
              className="group cursor-pointer select-none rounded-md px-2.5 py-1.5 hover:bg-gray-200"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={member.avatar_url || placeholderAvatar}
                  alt=""
                  onError={(e) => addDefaultSrc(e, "avatar")}
                  className="h-5 w-5 rounded-full border border-gray-200 object-cover object-center"
                />
                <span className="truncate font-roboto text-sm tracking-0.1 text-gray-700 group-hover:text-gray-800">
                  {capitalizeAllFirstLetters(member.name!)}
                </span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default CustomUsersSelect;
