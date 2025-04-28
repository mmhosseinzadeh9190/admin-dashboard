import { Activity } from "../../services/apiActivity";
import { Project } from "../../services/apiProjects";
import { User } from "../../services/apiUsers";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ActivityGroup from "./ActivityGroup";

interface ActivityGroupByProjectProps {
  activities: Activity[];
  projects: Project[];
  users: User[];
}

function ActivityGroupByProject({
  activities,
  projects,
  users,
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

  const groupedActivities = groupActivitiesByProject(activities, projects);

  return (
    <>
      {Object.keys(groupedActivities).map((projectName) => {
        if (groupedActivities[projectName].length === 0) return null;

        return (
          <ActivityGroup
            key={projectName}
            title={capitalizeFirstLetter(projectName)}
            activities={groupedActivities[projectName]}
            projects={projects}
            users={users}
          />
        );
      })}
    </>
  );
}

export default ActivityGroupByProject;
