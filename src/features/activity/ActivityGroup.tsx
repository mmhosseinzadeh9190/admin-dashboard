import { Activity } from "../../services/apiActivity";
import { Project } from "../../services/apiProjects";
import { User } from "../../services/apiUsers";
import ActivityCard from "./ActivityCard";

interface ActivityGroupProps {
  title: string;
  activities: Activity[];
  projects: Project[];
  users: User[];
}

function ActivityGroup({
  title,
  activities,
  projects,
  users,
}: ActivityGroupProps) {
  if (activities.length === 0) return null;

  return (
    <>
      <div className="col-span-full mt-4 flex justify-center font-semibold text-gray-900 first-of-type:mt-0">
        {title}
      </div>
      {activities.map((activity) => {
        const project = projects.find(
          (project) => project.id === activity.project_id,
        );
        return (
          <ActivityCard
            key={activity.id}
            activity={activity}
            project={project!}
            users={users}
          />
        );
      })}
    </>
  );
}

export default ActivityGroup;
