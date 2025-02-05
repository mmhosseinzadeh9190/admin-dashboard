import { SearchNormal1 } from "iconsax-react";
import React, { useState } from "react";
import { iconColor } from "../styles/GlobalStyles";
import Button from "./Button";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mr-auto w-72">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <Button type="submit" className="absolute left-3 top-3">
          <SearchNormal1 size="16" color={iconColor} variant="Linear" />
        </Button>

        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="block w-full rounded-full border border-gray-200 bg-gray-100 py-2.5 pl-9 pr-4 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
          required
        />
      </div>
    </form>
  );
}

export default SearchBar;
