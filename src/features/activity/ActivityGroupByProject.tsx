import { capitalizeFirstLetter } from "../../utils/helpers";
import ActivityGroup from "./ActivityGroup";

interface Activity {
  id: number;
  user_id: number | null;
  project_id: number | null;
  activity: string | null;
  activity_content: string[] | null;
  timestamp: string | null;
}

interface Project {
  id: number;
  name: string | null;
  description: string | null;
  tasks: string[] | null;
  attachments: string[] | null;
  status: string | null;
  deadline: string | null;
  created_by: number | null;
  created_at: string | null;
  updated_at: string | null;
  tags: string[] | null;
  team: number | null;
  tasks_done: string[] | null;
}

interface ActivityGroupByProjectProps {
  activities: { data: Activity[] | null; error: string | null };
  projects: { data: Project[] | null; error: string | null };
}

function ActivityGroupByProject({
  activities,
  projects,
}: ActivityGroupByProjectProps) {
  const groupActivitiesByProject = (
    activities: Activity[],
    projects: Project[],
  ) => {
    return activities.reduce(
      (acc, activity) => {
        const project = projects.find(
          (proj) => proj.id === activity.project_id,
        );
        const projectName = project ? project.name : "Nameless Project";
        acc[projectName!] = acc[projectName!]
          ? [...acc[projectName!], activity]
          : [activity];
        return acc;
      },
      {} as Record<string, Activity[]>,
    );
  };

  const groupedActivities = groupActivitiesByProject(
    activities.data!,
    projects.data!,
  );

  return (
    <>
      {Object.keys(groupedActivities).map((projectName) => {
        if (groupedActivities[projectName].length === 0) return null;

        return (
          <ActivityGroup
            key={projectName}
            title={capitalizeFirstLetter(projectName)}
            activities={groupedActivities[projectName]}
          />
        );
      })}
    </>
  );
}

export default ActivityGroupByProject;
