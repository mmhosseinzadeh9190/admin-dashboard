import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const navigate = useNavigate();

  let buttonText;
  let buttonIcon;
  let buttonModalContent;
  if (project.status === "pending") {
    buttonText = "Start";
    buttonIcon = <TimerStart size="16" variant="Linear" />;
  } else if (project.status === "run") {
    buttonText = "Complete";
    buttonIcon = <TickSquare size="16" variant="Linear" />;
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {user?.id === project.created_by && (
        <>
          {project.status === "pending" || project.status === "run" ? (
            <PreMadeButtons
              type="confirm"
              text={buttonText!}
              onClick={() => {}}
              icon={buttonIcon}
            />
          ) : null}

          <PreMadeButtons
            type="delete"
            text="Delete"
            onClick={() =>
              handleOpenModal(<DeleteProjectModalContent project={project} />)
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
