import { Activity } from "../services/apiActivity";
import { Project } from "../services/apiProjects";
import { User as UserType } from "../services/apiUsers";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";
import User from "./User";

type HeaderProps = {
  user: UserType;
  activities: Activity[];
  projects: Project[];
  onActivitiesUpdated: () => void;
  onProjectsUpdated: () => void;
};

function Header({
  user,
  activities,
  projects,
  onActivitiesUpdated,
  onProjectsUpdated,
}: HeaderProps) {
  const handleSearch = (searchTerm: string) => {
    console.log("Searched for:", searchTerm);
  };

  return (
    <header className="flex items-center justify-end gap-3 border-b border-gray-200 px-10 py-3">
      <SearchBar onSearch={handleSearch} />
      <User user={user} />

      <TaskList
        user={user}
        activities={activities}
        projects={projects}
        onActivitiesUpdated={onActivitiesUpdated}
        onProjectsUpdated={onProjectsUpdated}
      />
    </header>
  );
}

export default Header;
