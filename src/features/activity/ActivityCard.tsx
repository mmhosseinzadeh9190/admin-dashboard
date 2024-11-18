import Spinner from "../../ui/Spinner";
import {
  addDefaultSrc,
  capitalizeAllFirstLetters,
  extractTime,
} from "../../utils/helpers";
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

  const projectName =
    capitalizeAllFirstLetters(project?.name!) || "Unnamed Project";

  const user = users?.data?.find(
    (user) => String(user.id) === activity.user_id,
  );

  const name = capitalizeAllFirstLetters(user?.name!) || "Unknown User";
  const placeholderAvatar = "/public/avatarPlaceholder.png";
  const placeholderImage = "/public/imagePlaceholder.png";
  const userAvatar = user?.avatar_url || placeholderAvatar;

  const timeDisplay = activity.timestamp
    ? extractTime(activity.timestamp)
    : "Unknown time";

  let activityMessage;

  switch (activity.type) {
    case "task":
      activityMessage = `On ${projectName} ${name} checked off:`;
      break;
    case "comment":
      activityMessage = `${name} commented on ${projectName}`;
      break;
    case "photo":
      activityMessage = `${name} uploaded new photos on ${projectName}`;
      break;
    default:
      activityMessage = `${activity.type || "No Title"} activity detected.`;
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white px-5 py-4">
      <div className="flex items-center justify-between">
        <h4 className="font-roboto text-sm tracking-0.1 text-gray-600">
          {projectName}
        </h4>
        <span className="font-roboto text-xs text-gray-800">{timeDisplay}</span>
      </div>
      <div className="flex gap-3">
        <img
          src={userAvatar}
          alt=""
          onError={(e) => addDefaultSrc(e, "avatar")}
          className="h-10 w-10 rounded-full object-cover object-center"
        />
        <div className="flex flex-col gap-1 overflow-hidden break-words">
          <p className="font-roboto font-semibold tracking-0.1 text-gray-800">
            {activityMessage}
          </p>

          {activity.type === "task" && activity.content && (
            <div className="font-roboto text-sm tracking-0.1 text-gray-800">
              {activity.content.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    aria-label="checkbox"
                    checked={true}
                    readOnly
                    className="accent-success-600"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activity.type === "photo" && activity.content && (
            <div className="mt-2 flex flex-wrap gap-3">
              {activity.content.map((photo, index) => (
                <img
                  key={index}
                  src={photo || placeholderImage}
                  alt={`Uploaded photo ${name}`}
                  onError={(e) => addDefaultSrc(e, "image")}
                  className="h-44 rounded-lg"
                />
              ))}
            </div>
          )}

          {activity.type === "comment" && activity.content && (
            <p className="font-roboto text-sm tracking-0.1 text-gray-800">
              {activity.content[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
