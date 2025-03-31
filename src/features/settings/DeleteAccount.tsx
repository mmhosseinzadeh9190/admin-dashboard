import { ReactNode, useState } from "react";
import PreMadeButtons from "../../ui/PreMadeButtons";
import { LogoutCurve } from "iconsax-react";
import { useLogout } from "../authentication/useLogout";
import Modal from "../../ui/Modal";
import DeleteAccountModalContent from "./DeleteAccountModalContent";
import { User } from "@supabase/supabase-js";
import { Activity } from "../../services/apiActivity";
import { Team } from "../../services/apiTeams";
import { Project } from "../../services/apiProjects";

type DeleteAccountProps = {
  user: User | null | undefined;
  activities: { data: Activity[] | null; error: string | null };
  teams: { data: Team[] | null; error: string | null };
  projects: { data: Project[] | null; error: string | null };
};

function DeleteAccount({
  user,
  activities,
  teams,
  projects,
}: DeleteAccountProps) {
  const { logout, isPending } = useLogout();
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

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-error-700">
          Delete Account
        </h2>
      </div>

      <div className="px-1.5 pb-1.5">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-4">
          <p className="font-roboto text-sm tracking-0.1 text-gray-800">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <div className="flex justify-start gap-3">
            <PreMadeButtons
              type="delete"
              text="Delete your account"
              onClick={() =>
                handleOpenModal(
                  <DeleteAccountModalContent
                    user={user}
                    activities={activities!}
                    teams={teams!}
                    projects={projects!}
                    onClose={handleCloseModal}
                  />,
                )
              }
              disabled={isPending}
            />
            <PreMadeButtons
              type="delete"
              text="Logout of account"
              icon={<LogoutCurve size="16" />}
              onClick={handleLogout}
              disabled={isPending}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default DeleteAccount;
