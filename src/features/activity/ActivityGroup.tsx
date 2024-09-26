import { Activity } from "../../services/apiActivity";
import ActivityCard from "./ActivityCard";

interface ActivityGroupProps {
  title: string;
  activities: Activity[];
}

function ActivityGroup({ title, activities }: ActivityGroupProps) {
  if (activities.length === 0) return null;

  return (
    <>
      <div className="col-span-full mt-4 flex justify-center font-semibold text-gray-900 first-of-type:mt-0">
        {title}
      </div>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </>
  );
}

export default ActivityGroup;
