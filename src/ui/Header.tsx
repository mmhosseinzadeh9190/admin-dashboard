import DarkModeToggle from "./DarkModeToggle";
import SearchBar from "./SearchBar";
import User from "./User";

function Header() {
  const handleSearch = (searchTerm: string) => {
    console.log("Searched for:", searchTerm);
  };

  return (
    <header className="bored flex items-center justify-end gap-4 border-b border-gray-200 px-12 py-3">
      <SearchBar onSearch={handleSearch} />
      <User />
      <DarkModeToggle />
    </header>
  );
}

export default Header;
