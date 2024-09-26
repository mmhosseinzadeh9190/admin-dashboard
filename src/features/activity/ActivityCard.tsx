import Spinner from "../../ui/Spinner";
import { addDefaultSrc, extractTime, isValidImage } from "../../utils/helpers";
import { Activity } from "../../services/apiActivity";
import { useProjects } from "../projects/useProjects";
import { useUsers } from "../dashboard/useUsers";

interface ActivityCardProps {
  activity: Activity;
}

function ActivityCard({ activity }: ActivityCardProps) {
  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useProjects();

  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

  if (projectsIsLoading || usersIsLoading) return <Spinner />;

  const project = projects?.data?.find(
    (project) => project.id === activity.project_id,
  );

  const projectName = project ? project.name : "Unnamed Project";

  const user = users?.data?.find(
    (user) => String(user.id) === activity.user_id,
  );

  const username = user ? user.name : "Unknown User";

  const placeholderImage = "./../../../public/placeholder.png";

  const userPicture = isValidImage(user?.avatar_url!)
    ? user?.avatar_url
    : placeholderImage;

  const timeDisplay = activity.timestamp
    ? extractTime(activity.timestamp)
    : "Unknown time";

  let activityMessage;

  switch (activity.activity) {
    case "task":
      activityMessage = `On ${projectName} ${username} checked off:`;
      break;
    case "comment":
      activityMessage = `${username} commented on ${projectName}`;
      break;
    case "photo":
      activityMessage = `${username} uploaded new photos on ${projectName}`;
      break;
    default:
      activityMessage = `${activity.activity || "No Title"} activity detected.`;
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-roboto text-sm tracking-0.1 text-gray-600">
          {projectName}
        </h4>
        <span className="font-roboto text-xs text-gray-800">{timeDisplay}</span>
      </div>
      <div className="flex gap-3">
        <img
          src={userPicture!}
          alt={username!}
          className="h-10 w-10 rounded-full object-cover object-center"
        />
        <div className="flex flex-col gap-1">
          <p className="font-roboto font-semibold tracking-0.1 text-gray-800">
            {activityMessage}
          </p>

          {activity.activity === "task" && activity.activity_content && (
            <div className="font-roboto text-sm tracking-0.1 text-gray-800">
              {activity.activity_content.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 line-through"
                >
                  <input
                    type="checkbox"
                    aria-label="checkbox"
                    checked
                    className="accent-success-600"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activity.activity === "photo" && activity.activity_content && (
            <div className="mt-2 flex flex-wrap gap-3">
              {activity.activity_content.map((photo, index) => (
                <img
                  key={index}
                  src={
                    isValidImage(photo)
                      ? photo
                      : "./../../../public/imagePlaceholder.png"
                  }
                  alt={`Uploaded photo ${username}`}
                  onError={(e) => addDefaultSrc(e, "avatar")}
                  className="w-44 rounded-lg"
                />
              ))}
            </div>
          )}

          {activity.activity === "comment" && activity.activity_content && (
            <p className="font-roboto text-sm tracking-0.1 text-gray-800">
              {activity.activity_content[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
