import { useEffect, useState } from "react";
import { CloseSquare } from "iconsax-react";
import Button from "../../ui/Button";
import ModalContentNameInput from "../projects/ModalContentNameInput";
import AddTeamModalContentTeamMembers from "./AddTeamModalContentTeamMembers";
import AddTeamModalContentTeamLogo from "./AddTeamModalContentTeamLogo";
import EditProjectModalContentButtons from "../projects/EditProjectModalContentButtons";
import { Team } from "../../services/apiTeams";
import { User } from "../../services/apiUsers";
import { User as supabaseUser } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { urlToFile } from "../../utils/helpers";

interface EditTeamModalContentProps {
  team: Team;
  users: User[];
  user: supabaseUser;
  onClose: () => void;
  onTeamEdited: () => void;
}

function EditTeamModalContent({
  team,
  users,
  user,
  onClose,
  onTeamEdited,
}: EditTeamModalContentProps) {
  const teamMembersAsUsers = team.members
    ?.map((member) => users.find((u) => String(u.id) === member)!)
    .filter((teamMember) => String(teamMember.id) !== user.id);

  const [teamName, setTeamName] = useState<string>(team.name || "");
  const [teamMembers, setTeamMembers] = useState<User[]>(
    teamMembersAsUsers || [],
  );
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableUsers = users.filter((u) => String(u.id) !== user.id);

  const notChanged =
    (teamName === team.name || teamName === "") &&
    (JSON.stringify(teamMembers) === JSON.stringify(teamMembersAsUsers) ||
      (teamMembers.length === teamMembersAsUsers?.length &&
        teamMembers.every((item) => teamMembersAsUsers.includes(item))) ||
      teamMembers.length === 0) &&
    teamLogo?.name === team.team_logo?.split("/").at(-1)?.split(".").at(0);

  useEffect(() => {
    urlToFile(team.team_logo!).then((file) => setTeamLogo(file));
  }, []);

  const handleUserSelect = (member: User) => {
    if (!teamMembers.includes(member)) {
      setTeamMembers((prev) => [...prev, member]);
    } else {
      toast.error("This user already exists in the team!");
    }
  };

  const handleRemoveTeamMember = (member: User) => {
    setTeamMembers((prev) =>
      prev.filter((teamMember) => teamMember !== member),
    );
  };

  const handleAddLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setTeamLogo(file!);
  };

  const handleRemoveLogo = () => {
    setTeamLogo(null);
  };

  const handleImageUpload = async (image: File) => {
    const uniqueSuffix = Date.now();
    const newFileName = `${uniqueSuffix}-${image.name}`;

    const { error } = await supabase.storage
      .from("teams-logo")
      .upload(newFileName, image);

    if (error) {
      return null;
    }

    const { data } = supabase.storage
      .from("teams-logo")
      .getPublicUrl(newFileName);

    return { publicUrl: data.publicUrl };
  };

  const handleAddLogoToDatabase = async () => {
    const uploadResult = await handleImageUpload(teamLogo!);

    if (uploadResult && uploadResult.publicUrl) {
      const { error: updateLogoError } = await supabase
        .from("teams")
        .update({ team_logo: uploadResult.publicUrl })
        .eq("id", team.id);

      if (updateLogoError) {
        throw new Error(updateLogoError.message);
      }
    } else {
      throw new Error();
    }
  };

  const handleDeleteLogoFromDatabase = async () => {
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

      const { error: updateLogoError } = await supabase
        .from("teams")
        .update({
          team_logo:
            "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/teams-logo/image-placeholder.png",
        })
        .eq("id", team.id);

      if (updateLogoError) {
        throw new Error(updateLogoError.message);
      }
    }
  };

  const handleAddTeam = async () => {
    try {
      setIsSubmitting(true);

      const teamMembersId = teamMembers.map((teamMember) => teamMember.id);

      if (
        teamName !== team.name ||
        teamName !== "" ||
        JSON.stringify(teamMembers) !== JSON.stringify(teamMembersAsUsers) ||
        (teamMembers.length !== teamMembersAsUsers?.length &&
          !teamMembers.every((item) => teamMembersAsUsers?.includes(item))) ||
        teamMembers.length !== 0
      ) {
        const updatedTeam = {
          name: teamName,
          members: [user.id, ...teamMembersId],
          team_size: teamMembers.length + 1,
        };

        const { error: updateTeamError } = await supabase
          .from("teams")
          .update(updatedTeam)
          .eq("id", team.id);

        if (updateTeamError) {
          throw new Error(updateTeamError.message);
        }
      }

      if (!teamLogo) {
        try {
          await handleDeleteLogoFromDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      if (
        teamLogo &&
        teamLogo?.name !== team.team_logo?.split("/").at(-1)?.split(".").at(0)
      ) {
        try {
          await handleDeleteLogoFromDatabase();
          await handleAddLogoToDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      toast.success("Team edited successfully!");
      onTeamEdited();
      onClose();
    } catch (error) {
      toast.error("Failed to edit team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-xl w-4xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Edit Team
        </h2>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed"
        >
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <div className="-mr-8 flex flex-col gap-8 overflow-y-scroll pr-8">
        <ModalContentNameInput
          name={teamName}
          setName={setTeamName}
          title="Team name"
          disabled={isSubmitting}
        />

        <AddTeamModalContentTeamMembers
          users={availableUsers!}
          handleUserSelect={handleUserSelect}
          teamMembers={teamMembers}
          handleRemoveTeamMember={handleRemoveTeamMember}
          disabled={isSubmitting}
        />

        <AddTeamModalContentTeamLogo
          logo={teamLogo}
          handleAddLogo={handleAddLogo}
          handleRemoveLogo={handleRemoveLogo}
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-2 mt-auto flex justify-end">
        <EditProjectModalContentButtons
          onClose={onClose}
          disabled={isSubmitting}
          notConfirmed={notChanged}
          handleSave={handleAddTeam}
        />
      </div>
    </div>
  );
}

export default EditTeamModalContent;
