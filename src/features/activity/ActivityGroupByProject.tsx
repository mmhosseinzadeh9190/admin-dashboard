import { Activity } from "../../services/apiActivity";
import { Project } from "../../services/apiProjects";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ActivityGroup from "./ActivityGroup";

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
