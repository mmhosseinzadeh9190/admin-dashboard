import { CloseSquare, Code } from "iconsax-react";
import Button from "../../ui/Button";
import PreMadeButtons from "../../ui/PreMadeButtons";
import { useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { Team } from "../../services/apiTeams";
import { Project } from "../../services/apiProjects";
import { useNavigate } from "react-router-dom";
import { capitalizeAllFirstLetters } from "../../utils/helpers";

interface DeleteTeamModalContentProps {
  team: Team;
  projects: Project[];
  onDeleteSuccess: () => void;
  onClose: () => void;
}

function DeleteTeamModalContent({
  team,
  projects,
  onDeleteSuccess,
  onClose,
}: DeleteTeamModalContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const teamProjects = team.projects_id?.map((id) =>
    projects.find((project) => project.id === +id),
  );

  const notAllowed = teamProjects?.length! > 0;

  const handleDeleteTeam = async () => {
    try {
      setIsSubmitting(true);

      if (
        team.team_logo !==
        "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/teams-logo/image-placeholder.png"
      ) {
        const { error: storageDeleteError } = await supabase.storage
          .from("teams-logo")
          .remove([`${team.team_logo?.split("/").pop()}`]);

        if (storageDeleteError) {
          throw new Error(storageDeleteError.message);
        }
      }

      const { error: teamDeleteError } = await supabase
        .from("teams")
        .delete()
        .eq("id", team.id);

      if (teamDeleteError) {
        throw new Error(teamDeleteError.message);
      }

      toast.success("Team deleted successfully!");
      onDeleteSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to delete Team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Delete Team
        </h2>

        <Button onClick={onClose} className="text-gray-600 hover:text-gray-700">
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to delete this team?{" "}
        <span className="font-medium">This action cannot be undone.</span>
      </p>

      {teamProjects?.length! > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            This team currently has {teamProjects?.length}{" "}
            {teamProjects?.length! > 1 ? "projects" : "project"}.
          </p>

          <ul className="flex flex-col gap-1">
            {teamProjects?.map((project) => {
              return (
                <li
                  key={project?.id}
                  className="flex items-center gap-1 overflow-hidden"
                >
                  <Code className="text-gray-600" size="16" />
                  <span
                    onClick={() => navigate(`/projects/${project?.id}`)}
                    className="max-w-96 cursor-pointer truncate font-roboto text-sm font-medium tracking-0.1 text-primary-800 hover:text-primary-900 hover:underline"
                  >
                    {capitalizeAllFirstLetters(project?.name!)}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            Please complete and remove the above{" "}
            {teamProjects?.length! > 1 ? "projects" : "project"} to be able to
            delete the team.
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
            text="Delete"
            onClick={handleDeleteTeam}
            disabled={notAllowed || isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteTeamModalContent;
