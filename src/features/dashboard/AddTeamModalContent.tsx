import { CloseSquare } from "iconsax-react";
import Button from "../../ui/Button";
import ModalContentNameInput from "../projects/ModalContentNameInput";
import { useState } from "react";
import AddTeamModalContentTeamMembers from "./AddTeamModalContentTeamMembers";
import { User } from "../../services/apiUsers";
import toast from "react-hot-toast";
import AddTeamModalContentTeamLogo from "./AddTeamModalContentTeamLogo";
import supabase from "../../services/supabase";
import { generateUniqueId } from "../../utils/helpers";
import EditProjectModalContentButtons from "../projects/EditProjectModalContentButtons";
import { User as supabaseUser } from "@supabase/supabase-js";

interface AddTeamModalContentProps {
  user: supabaseUser;
  users: User[];
  onClose: () => void;
  onTeamAdded: () => void;
}

function AddTeamModalContent({
  user,
  users,
  onClose,
  onTeamAdded,
}: AddTeamModalContentProps) {
  const [teamName, setTeamName] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableUsers = users.filter((u) => String(u.id) !== user.id);
  const teamId = generateUniqueId();
  const emptyFields = teamName === "" || teamMembers.length === 0;

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
      const { error } = await supabase
        .from("teams")
        .update({ team_logo: uploadResult.publicUrl })
        .eq("id", teamId);

      if (error) {
        throw new Error(error.message);
      }
    } else {
      throw new Error();
    }
  };

  const handleAddTeam = async () => {
    try {
      setIsSubmitting(true);

      const teamMembersId = teamMembers.map((teamMember) => teamMember.id);

      const team = {
        id: teamId,
        name: teamName,
        members: [user.id, ...teamMembersId],
        team_size: teamMembers.length + 1,
        leader_id: user.id,
        projects_id: [],
        team_logo:
          "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/teams-logo/image-placeholder.png",
        created_at: new Date(),
      };

      const { error: insertTeamError } = await supabase
        .from("teams")
        .insert([team]);

      if (insertTeamError) {
        throw new Error(insertTeamError.message);
      }

      if (teamLogo) {
        try {
          await handleAddLogoToDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      toast.success("Team added successfully!");
      onTeamAdded();
      onClose();
    } catch (error) {
      toast.error("Failed to add team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-xl w-4xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Add Team
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
          notConfirmed={emptyFields}
          handleSave={handleAddTeam}
        />
      </div>
    </div>
  );
}

export default AddTeamModalContent;
