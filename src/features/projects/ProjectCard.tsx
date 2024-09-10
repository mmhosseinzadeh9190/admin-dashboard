import { useQuery } from "@tanstack/react-query";
import { Clock, Paperclip2, TickSquare } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import { getTeams } from "../../services/apiTeams";
import Spinner from "../../ui/Spinner";
import { daysUntil } from "../../utils/helpers";
import { getUsers } from "../../services/apiUsers";
import ProgressBar from "../../ui/ProgressBar";
import Button from "../../ui/Button";

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

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const {
    data: teams,
    isLoading: teamsIsLoading,
    error: teamsError,
  } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  });

  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  if (teamsIsLoading || usersIsLoading) return <Spinner />;

  const teamMembers = teams?.data?.find(
    (team) => team.id === project.team,
  )?.members;

  const daysLeft = daysUntil(project.deadline!);
  const deadlineText = daysLeft < 0 ? "days past" : "days left";

  let textColor = "text-gray-700",
    bgColor = "bg-gray-200",
    iconClockColor = "#696974";

  if (daysLeft <= 7) {
    textColor = "text-warning-600";
    bgColor = "bg-warning-50";
    iconClockColor = "#FF7F00";
  }

  if (daysLeft <= 3) {
    textColor = "text-error-600";
    bgColor = "bg-error-50";
    iconClockColor = "#ed1515";
  }

  return (
    <div className="flex flex-col gap-1.5 rounded-[20px] bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <h3
          className={`truncate text-sm font-semibold tracking-0.1 text-gray-900 ${
            project.status === "done" ? "line-through" : ""
          }`}
        >
          {project.name}
        </h3>
        <Button className="select-none">
          <img src="/src/assets/ellipsis.svg" alt="Options" />
        </Button>
      </div>

      <>
        {teams?.data?.map(
          (team) =>
            team.id === project.team && (
              <div
                key={team.id}
                className="font-roboto text-sm tracking-0.1 text-gray-700"
              >
                {team.name}
              </div>
            ),
        )}
      </>

      <div
        className={`flex gap-5 ${project.status === "done" ? "mt-4" : "mt-2"}`}
      >
        <span className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-600">
          <Paperclip2 size="16" color={iconColor} variant="Linear" />
          {project.attachments?.length ?? 0}
        </span>

        <span className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-600">
          <TickSquare size="16" color={iconColor} variant="Linear" />
          {`${project.tasks_done?.length ?? 0}/${project.tasks?.length ?? 0}`}
        </span>

        {project.status !== "done" && (
          <span
            className={`flex items-center gap-1 rounded-md ${bgColor} ${textColor} px-1.5 py-1 font-roboto text-sm tracking-0.1`}
          >
            <Clock size="16" color={iconClockColor} variant="Linear" />
            {`${Math.abs(daysLeft)} ${deadlineText}`}
          </span>
        )}
      </div>

      <div className="mt-6">
        <ProgressBar
          totalTasks={project.tasks?.length ?? 0}
          completedTasks={project.tasks_done?.length ?? 0}
        />
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        {users?.data?.map(
          (user) =>
            teamMembers?.slice(0, 5).includes(user.id) && (
              <img
                key={user.id}
                src={user.profile_picture!}
                alt={user.username!}
                className="h-8 w-8 rounded-full object-cover object-center"
              />
            ),
        )}
        {teamMembers && teamMembers.length > 5 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
            <span className="mr-px mt-px text-xs text-gray-700">
              +{teamMembers.length - 5}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
