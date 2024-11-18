import { Calendar, TickSquare } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { iconColor } from "../../styles/GlobalStyles";
import ProgressBar from "../../ui/ProgressBar";
import { Schedule } from "../../services/apiSchedule";
import { User } from "../../services/apiUsers";
import {
  addDefaultSrc,
  formatISODateToCustomFormat,
} from "../../utils/helpers";
import toast from "react-hot-toast";

interface ProjectDetailsTasksProps {
  project: Project;
  schedules: { data: Schedule[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
}

function ProjectDetailsTasks({
  project,
  schedules,
  users,
}: ProjectDetailsTasksProps) {
  const totalTasks = project.tasks?.length ?? 0;
  const completedTasks = project.tasks_done?.length ?? 0;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getTaskInfo = (task: string) => {
    const schedule = schedules?.data?.find(
      (schedule) => schedule.task === task,
    );
    const assignedUser = users?.data?.find(
      (user) => String(user.id) === schedule?.assigned_to,
    );
    return { schedule, assignedUser };
  };

  const placeholderImage = "/public/imagePlaceholder.png";

  const handleCheckboxClick = () =>
    toast.error("You can only view the details but not change them!");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <TickSquare size="20" color={iconColor} variant="Linear" />
        <h3 className="font-semibold tracking-0.1 text-gray-900">Task List</h3>
      </div>

      <div className="flex items-center gap-2">
        <ProgressBar
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          height="h-2"
          progressPercentagePosition="hidden"
        />
        <span className="font-roboto text-sm text-gray-700">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {project.tasks?.length! > 0 && (
        <div className="flex flex-col gap-4">
          {project.tasks?.map((task, index) => {
            const { schedule, assignedUser } = getTaskInfo(task);
            const isChecked = project.tasks_done?.includes(task);
            return (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  aria-label="checkbox"
                  checked={isChecked}
                  onClick={handleCheckboxClick}
                  className="h-3.5 w-5 accent-success-600 focus:outline-none"
                  readOnly
                />
                <div className="flex w-full items-center gap-2.5 overflow-hidden">
                  <span className="max-w-3xl truncate font-roboto tracking-0.1 text-gray-800">
                    {task}
                  </span>
                  <span className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-600">
                    <Calendar size="16" color={iconColor} variant="Linear" />
                    {formatISODateToCustomFormat(schedule?.date!)}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assignedUser?.avatar_url || placeholderImage}
                      alt=""
                      onError={(e) => addDefaultSrc(e, "avatar")}
                      className="h-5 w-5 rounded-full object-cover object-center"
                    />
                    <span className="font-roboto text-sm text-gray-500">
                      {assignedUser?.name}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectDetailsTasks;
