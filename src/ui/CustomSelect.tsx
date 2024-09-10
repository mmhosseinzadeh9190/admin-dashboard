import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Filter } from "iconsax-react";
import { iconColor } from "../styles/GlobalStyles";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
}

function CustomSelect({ options }: CustomSelectProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-40">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className="relative block w-full rounded-[10px] bg-white py-2 pl-3 pr-8 text-left font-roboto text-sm tracking-0.1 text-gray-800 shadow-sm">
          {selected.label}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-2.5"
          >
            <Filter size="16" color={iconColor} variant="Bulk" />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="mt-1 w-[var(--button-width)] rounded-[10px] border border-gray-200 bg-white p-1 shadow-[0_5px_15px_0] shadow-gray-800/10 [--anchor-gap:var(--spacing-1)]"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="select-none rounded-md px-3 py-1.5 hover:bg-gray-100"
            >
              <div className="font-roboto text-sm tracking-0.1 text-gray-700">
                {option.label}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default CustomSelect;
