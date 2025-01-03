import { Activity } from "../../services/apiActivity";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ActivityGroup from "./ActivityGroup";

interface ActivityGroupByTypeProps {
  activities: { data: Activity[] | null; error: string | null };
}

function ActivityGroupByType({ activities }: ActivityGroupByTypeProps) {
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

  const groupedActivities = groupActivitiesByType(activities.data!);

  return (
    <>
      {Object.keys(groupedActivities).map((activityType) => {
        if (groupedActivities[activityType].length === 0) return null;

        return (
          <ActivityGroup
            key={activityType}
            title={`${capitalizeFirstLetter(activityType)}s`}
            activities={groupedActivities[activityType]}
          />
        );
      })}
    </>
  );
}

export default ActivityGroupByType;
