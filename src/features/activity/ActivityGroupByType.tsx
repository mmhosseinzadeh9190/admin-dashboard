import { Activity } from "../../services/apiActivity";
import { Project } from "../../services/apiProjects";
import { User } from "../../services/apiUsers";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ActivityGroup from "./ActivityGroup";

interface ActivityGroupByTypeProps {
  activities: Activity[];
  projects: Project[];
  users: User[];
}

function ActivityGroupByType({
  activities,
  projects,
  users,
}: ActivityGroupByTypeProps) {
  const groupActivitiesByType = (activities: Activity[]) => {
    return activities.reduce(
      (acc, activity) => {
        const activityType = activity.type;
        acc[activityType!] = acc[activityType!]
          ? [...acc[activityType!], activity]
          : [activity];
        return acc;
      },
      {} as Record<string, Activity[]>,
    );
  };

  const groupedActivities = groupActivitiesByType(activities);

  return (
    <>
      {Object.keys(groupedActivities).map((activityType) => {
        if (groupedActivities[activityType].length === 0) return null;

        return (
          <ActivityGroup
            key={activityType}
            title={`${capitalizeFirstLetter(activityType)}s`}
            activities={groupedActivities[activityType]}
            projects={projects}
            users={users}
          />
        );
      })}
    </>
  );
}

export default ActivityGroupByType;
