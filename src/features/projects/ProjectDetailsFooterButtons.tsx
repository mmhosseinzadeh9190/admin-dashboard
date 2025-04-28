import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TickSquare, TimerStart } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { Schedule } from "../../services/apiSchedule";
import { User } from "../../services/apiUsers";
import { Team } from "../../services/apiTeams";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Modal from "../../ui/Modal";
import DeleteProjectModalContent from "./DeleteProjectModalContent";
import EditProjectModalContent from "./EditProjectModalContent";
import PreMadeButtons from "../../ui/PreMadeButtons";
import StartProjectModalContent from "./StartProjectModalContent";
import CompleteProjectModalContent from "./CompleteProjectModalContent";

interface ProjectDetailsFooterButtonsProps {
  project: Project;
  schedules: { data: Schedule[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
  teams: { data: Team[] | null; error: string | null } | undefined;
  user: SupabaseUser;
  onProjectUpdated: () => void;
  onScheduleUpdated: () => void;
}

function ProjectDetailsFooterButtons({
  project,
  schedules,
  users,
  teams,
  user,
  onProjectUpdated,
  onScheduleUpdated,
}: ProjectDetailsFooterButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const param = searchParams.get("edit");
    if (param && param === "true") {
      handleOpenModal(
        <EditProjectModalContent
          project={project}
          schedules={schedules}
          users={users}
          teams={teams}
          onClose={handleCloseModal}
          onProjectUpdated={onProjectUpdated}
          onScheduleUpdated={onScheduleUpdated}
        />,
      );
    }
  }, [searchParams]);

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  let buttonText: string;
  let buttonIcon: JSX.Element;
  let buttonModalContent: JSX.Element;

  if (project.status === "pending") {
    buttonText = "Start";
    buttonIcon = <TimerStart size="16" variant="Linear" />;
    buttonModalContent = (
      <StartProjectModalContent
        project={project}
        onProjectUpdated={onProjectUpdated}
        onClose={handleCloseModal}
      />
    );
  }

  if (project.status === "run") {
    buttonText = "Complete";
    buttonIcon = <TickSquare size="16" variant="Linear" />;
    buttonModalContent = (
      <CompleteProjectModalContent
        project={project}
        onProjectUpdated={onProjectUpdated}
        onClose={handleCloseModal}
      />
    );
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {user?.id === project.created_by && (
        <>
          {project.status === "pending" || project.status === "run" ? (
            <PreMadeButtons
              type="confirm"
              text={buttonText!}
              onClick={() => handleOpenModal(buttonModalContent)}
              icon={buttonIcon!}
            />
          ) : null}

          <PreMadeButtons
            type="delete"
            text="Delete"
            onClick={() =>
              handleOpenModal(
                <DeleteProjectModalContent
                  project={project}
                  teams={teams?.data!}
                  onClose={handleCloseModal}
                />,
              )
            }
          />

          <PreMadeButtons
            type="edit"
            text="Edit"
            onClick={() =>
              handleOpenModal(
                <EditProjectModalContent
                  project={project}
                  schedules={schedules}
                  users={users}
                  teams={teams}
                  onClose={handleCloseModal}
                  onProjectUpdated={onProjectUpdated}
                  onScheduleUpdated={onScheduleUpdated}
                />,
              )
            }
          />
        </>
      )}

      <PreMadeButtons type="cancel" text="Back" onClick={() => navigate(-1)} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default ProjectDetailsFooterButtons;
