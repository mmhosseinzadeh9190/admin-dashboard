import { ReactNode, useState } from "react";
import CustomDropdown from "../../ui/CustomDropdown";
import Modal from "../../ui/Modal";
import TeamCard from "./TeamCard";
import { AddSquare } from "iconsax-react";
import AddTeamModalContent from "./AddTeamModalContent";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "../../services/apiUsers";
import { Team } from "../../services/apiTeams";
import { Project } from "../../services/apiProjects";
import { Schedule } from "../../services/apiSchedule";

type UserTeamsProps = {
  user: SupabaseUser;
  users: { data: User[] | null; error: string | null };
  teams: { data: Team[] | null; error: string | null };
  projects: { data: Project[] | null; error: string | null };
  schedules: { data: Schedule[] | null; error: string | null };
  teamsRefetch: () => void;
};

function UserTeams({
  user,
  users,
  teams,
  projects,
  schedules,
  teamsRefetch,
}: UserTeamsProps) {
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

  const dropdownItems = [
    {
      icon: <AddSquare size="16" variant="Linear" />,
      label: "Add team",
      onClick: () =>
        handleOpenModal(
          <AddTeamModalContent
            user={user!}
            users={users?.data!}
            onClose={handleCloseModal}
            onTeamAdded={teamsRefetch}
          />,
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Teams
        </h2>

        <CustomDropdown
          items={dropdownItems.map((item) => ({
            ...item,
            onClick: item.onClick,
          }))}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      </div>

      <TeamCard
        teams={teams}
        users={users}
        projects={projects}
        schedules={schedules}
        onTeamUpdated={teamsRefetch}
      />
    </div>
  );
}

export default UserTeams;
