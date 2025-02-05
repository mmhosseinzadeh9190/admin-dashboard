import { useState } from "react";
import Button from "../../ui/Button";
import { ClipboardText, CloseSquare, Code, LogoutCurve } from "iconsax-react";
import PreMadeButtons from "../../ui/PreMadeButtons";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { Team } from "../../services/apiTeams";
import { User as supabaseUser } from "@supabase/supabase-js";
import { Schedule } from "../../services/apiSchedule";
import { Project } from "../../services/apiProjects";
import {
  capitalizeAllFirstLetters,
  capitalizeFirstLetter,
} from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface LeaveTeamModalContentProps {
  team: Team;
  user: supabaseUser;
  schedules: Schedule[];
  projects: Project[];
  onLeaveSuccess: () => void;
  onClose: () => void;
}

function LeaveTeamModalContent({
  team,
  user,
  schedules,
  projects,
  onLeaveSuccess,
  onClose,
}: LeaveTeamModalContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const filteredTeamMembersId = team.members?.filter(
    (member) => member !== user.id,
  );

  const userUncompletedTasks = schedules.filter(
    (task) => task.assigned_to === user.id && task.completed == false,
  );

  const userUncompletedTasksInTeam = team.projects_id?.flatMap((id) =>
    userUncompletedTasks?.filter((task) => task.project_id === +id),
  );

  const notAllowed = userUncompletedTasksInTeam?.length! > 0;

  const handleLeaveTeam = async () => {
    try {
      setIsSubmitting(true);

      const updatedTeam = {
        members: filteredTeamMembersId,
        team_size: filteredTeamMembersId?.length,
      };

      const { error: updateTeamError } = await supabase
        .from("teams")
        .update(updatedTeam)
        .eq("id", team.id);

      if (updateTeamError) {
        throw new Error(updateTeamError.message);
      }

      toast.success("You have successfully left the team!");
      onLeaveSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to left Team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Leave Team
        </h2>

        <Button onClick={onClose} className="text-gray-600 hover:text-gray-700">
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to leave this team?
      </p>

      {userUncompletedTasksInTeam?.length! > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            In this team, you still have {userUncompletedTasksInTeam?.length}{" "}
            unfinished{" "}
            {userUncompletedTasksInTeam?.length! > 1 ? "tasks" : "task"}.
          </p>

          <ul className="flex flex-col gap-2.5">
            {userUncompletedTasksInTeam?.map((task) => {
              const project = projects.find((p) => p.id === task.project_id);
              return (
                <li
                  key={task.id}
                  className="flex items-center gap-2.5 overflow-hidden"
                >
                  <span className="flex items-center gap-1">
                    <ClipboardText className="text-gray-600" size="16" />
                    <span
                      // TODO: change navigate path to task list page
                      onClick={() => navigate(`/projects/${project?.id}`)}
                      className="max-w-80 cursor-pointer truncate font-roboto text-sm font-medium tracking-0.1 text-primary-800 hover:text-primary-900 hover:underline"
                    >
                      {capitalizeFirstLetter(task.task!)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Code size="16" />
                    <span className="font-roboto text-sm tracking-0.1">
                      {capitalizeAllFirstLetters(project?.name!)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            Please complete the above{" "}
            {userUncompletedTasksInTeam?.length! > 1 ? "tasks" : "task"} to be
            able to leave the team.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <div className="flex w-2/3 gap-3">
          <PreMadeButtons
            type="cancel"
            text="Cancel"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full"
          />

          <PreMadeButtons
            type="delete"
            text="Leave"
            icon={<LogoutCurve size="16" variant="Linear" />}
            onClick={handleLeaveTeam}
            disabled={notAllowed || isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default LeaveTeamModalContent;
