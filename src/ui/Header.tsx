import { User as UserType } from "../services/apiUsers";
import NotificationButton from "./NotificationButton";
import SearchBar from "./SearchBar";
import TaskButton from "./TaskButton";
import User from "./User";

type HeaderProps = {
  user: UserType;
};

function Header({ user }: HeaderProps) {
  const handleSearch = (searchTerm: string) => {
    console.log("Searched for:", searchTerm);
  };

  return (
    <header className="flex items-center justify-end gap-6 border-b border-gray-200 px-10 py-3">
      <SearchBar onSearch={handleSearch} />
      <User user={user} />
      <ul className="flex items-center gap-2">
        <li>
          <NotificationButton />
        </li>
        <li>
          <TaskButton />
        </li>
      </ul>
    </header>
  );
}

export default Header;
