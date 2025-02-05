import { CloseSquare } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import Button from "../../ui/Button";
import PreMadeButtons from "../../ui/PreMadeButtons";
import { useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useProjects } from "./useProjects";
import { useNavigate } from "react-router-dom";
import { Team } from "../../services/apiTeams";

interface DeleteProjectModalContentProps {
  project: Project;
  teams: Team[];
  onClose: () => void;
}

function DeleteProjectModalContent({
  project,
  teams,
  onClose,
}: DeleteProjectModalContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refetch: projectsRefetch } = useProjects();
  const navigate = useNavigate();
  const projectTeamId = project.team;
  const teamProjectsId = teams.find(
    (team) => team.id === projectTeamId,
  )?.projects_id;
  const filteredTeamProjectsId = teamProjectsId?.filter(
    (id) => +id !== project.id,
  );

  const handleDeleteProject = async () => {
    try {
      setIsSubmitting(true);

      if (project.attachments?.length! > 0) {
        for (const attachment of project.attachments!) {
          const { error: storageDeleteError } = await supabase.storage
            .from("projects-images")
            .remove([`${attachment.split("/").pop()}`]);
          if (storageDeleteError) {
            throw new Error(storageDeleteError.message);
          }
        }
      }

      const { error: activitiesError } = await supabase
        .from("activities")
        .delete()
        .eq("project_id", project.id);

      if (activitiesError) {
        throw new Error(activitiesError.message);
      }

      const { error: schedulesError } = await supabase
        .from("schedules")
        .delete()
        .eq("project_id", project.id);

      if (schedulesError) {
        throw new Error(schedulesError.message);
      }

      const { error: projectError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (projectError) {
        throw new Error(projectError.message);
      }

      const { error: updateTeamError } = await supabase
        .from("teams")
        .update({ projects_id: filteredTeamProjectsId })
        .eq("id", projectTeamId);

      if (updateTeamError) {
        throw new Error(updateTeamError.message);
      }

      toast.success("Project deleted successfully!");
      navigate("/projects");
      projectsRefetch();
      onClose();
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Delete Project
        </h2>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed"
        >
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to delete this project?{" "}
        <span className="font-medium">This action cannot be undone.</span>
      </p>

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
            onClick={handleDeleteProject}
            disabled={isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModalContent;
