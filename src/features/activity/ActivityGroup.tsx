import ActivityCard from "./ActivityCard";

interface Activity {
  id: number;
  user_id: number | null;
  project_id: number | null;
  activity: string | null;
  activity_content: string[] | null;
  timestamp: string | null;
}

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
