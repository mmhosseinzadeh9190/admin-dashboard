import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Sort } from "iconsax-react";
import { iconColor } from "../styles/GlobalStyles";
import { useSearchParams } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
}

function CustomSelect({ options }: CustomSelectProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Option>(options[0]);
  const filterValue = searchParams.get("sortBy");

  useEffect(() => {
    const filterOption = options.find((option) => option.value === filterValue);
    if (filterOption) {
      setSelected(filterOption);
    } else {
      setSelected(options[0]);
    }
  }, [filterValue, options]);

  const handleChange = (option: Option) => {
    setSelected(option);
    searchParams.set("sortBy", option.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-40">
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton className="relative block w-full rounded-lg bg-white py-2 pl-3 pr-9 text-left font-roboto text-sm tracking-0.1 text-gray-800 shadow-sm focus:outline-none">
          {selected.label}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-2.5"
          >
            <Sort size="18" color={iconColor} variant="Linear" />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className="mt-1 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-[0_5px_15px_0] shadow-gray-800/10 focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group cursor-pointer select-none rounded-md px-3 py-1.5 hover:bg-gray-200"
            >
              <div className="font-roboto text-sm tracking-0.1 text-gray-700 group-hover:text-gray-800">
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
