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
}

function CustomUsersSelect({ members, onUserSelect }: CustomUsersSelectProps) {
  const [selected, setSelected] = useState(members[0]);

  const placeholderAvatar = "/public/avatarPlaceholder.png";

  const handleChange = (member: User) => {
    setSelected(member);
    onUserSelect(member);
  };

  return (
    <div className="w-52">
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton className="relative flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 focus:outline-none">
          <img
            src={selected.avatar_url || placeholderAvatar}
            alt=""
            onError={(e) => addDefaultSrc(e, "avatar")}
            className="h-5 w-5 rounded-full object-cover object-center"
          />
          <span className="truncate font-roboto text-sm tracking-0.1 text-gray-800">
            {capitalizeAllFirstLetters(selected.name!)}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-2.5"
          >
            <ArrowDown2 size="16" color={iconColor} variant="Linear" />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="top"
          transition
          className="z-30 -mt-2.5 w-52 rounded-lg border border-gray-200 bg-white p-1 shadow-[0_5px_15px_0] shadow-gray-800/10 focus:outline-none"
        >
          {members.map((member) => (
            <ListboxOption
              key={member.id}
              value={member}
              className="group cursor-pointer select-none rounded-md px-3 py-1.5 hover:bg-gray-200"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={member.avatar_url || placeholderAvatar}
                  alt=""
                  onError={(e) => addDefaultSrc(e, "avatar")}
                  className="h-5 w-5 rounded-full object-cover object-center"
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
