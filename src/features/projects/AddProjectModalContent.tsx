import { useState } from "react";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";
import { CloseSquare } from "iconsax-react";
import { generateUniqueId } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useProjects } from "./useProjects";
import EditProjectModalContentProjectName from "./EditProjectModalContentProjectName";
import EditProjectModalContentProjectDescription from "./EditProjectModalContentProjectDescription";
import AddProjectModalContentProjectAttachments from "./AddProjectModalContentProjectAttachments";
import EditProjectModalContentButtons from "./EditProjectModalContentButtons";
import AddProjectModalContentProjectTeam from "./AddProjectModalContentProjectTeam";
import { useTeams } from "../dashboard/useTeams";
import Spinner from "../../ui/Spinner";
import { Team } from "../../services/apiTeams";
import AddProjectModalContentProjectDeadline from "./AddProjectModalContentProjectDeadline";
import EditProjectModalContentTags from "./EditProjectModalContentTags";

interface AddProjectModalContentProps {
  status: "done" | "pending" | "run";
  onClose: () => void;
}

function AddProjectModalContent({
  status,
  onClose,
}: AddProjectModalContentProps) {
  const { user } = useUser();
  const { teams, isLoading, error } = useTeams();
  const { refetch: projectsRefetch } = useProjects();

  const userTeams = teams?.data?.filter((team) => team.leader_id === user?.id);

  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [team, setTeam] = useState<Team | null>(userTeams![0]);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyField = !(projectName.trim() && team && deadline);

  if (isLoading) return <Spinner />;

  const projectId = generateUniqueId();

  const handleRemoveAttachment = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const handleAddAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray = Array.from(files!);
    setSelectedImages((prev) => [...prev, ...filesArray]);
  };

  const handleImageUpload = async (image: File) => {
    const uniqueSuffix = Date.now();
    const newFileName = `${uniqueSuffix}-${image.name}`;

    const { error } = await supabase.storage
      .from("projects-images")
      .upload(newFileName, image);

    if (error) {
      return null;
    }

    const { data } = supabase.storage
      .from("projects-images")
      .getPublicUrl(newFileName);

    return { publicUrl: data.publicUrl };
  };

  const handleAddAttachmentToDatabase = async () => {
    const imageUrls: string[] = [];

    for (const image of selectedImages) {
      const uploadResult = await handleImageUpload(image);

      if (uploadResult && uploadResult.publicUrl) {
        imageUrls.push(uploadResult.publicUrl);
      } else {
        throw new Error();
      }
    }

    const { error: projectUpdateError } = await supabase
      .from("projects")
      .update({ attachments: [...imageUrls] })
      .eq("id", projectId);

    if (projectUpdateError) {
      throw new Error(projectUpdateError.message);
    }

    const activityData = {
      id: generateUniqueId(),
      content: imageUrls,
      project_id: projectId,
      user_id: user?.id,
      timestamp: new Date(),
      type: "photo",
    };

    const { error: insertActivityDataError } = await supabase
      .from("activities")
      .insert([activityData]);

    if (insertActivityDataError) {
      throw new Error(insertActivityDataError.message);
    }

    projectsRefetch();
  };

  const handleTeamSelect = (team: Team) => {
    setTeam(team);
  };

  const handleDateChange = (date: Date) => {
    setDeadline(date);
  };

  const handleAddTag = () => {
    if (newTag.trim() === "") {
      toast.error("Please enter a tag name.");
      return;
    }
    if (tags.includes(newTag.trim())) {
      toast.error("This tag already exists.");
      return;
    }

    setTags([...tags, newTag]);
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleAddProject = async () => {
    try {
      setIsSubmitting(true);

      const newProject = {
        id: projectId,
        name: projectName,
        description,
        team: team?.id,
        tasks: [],
        tasks_done: [],
        attachments: [],
        status,
        created_at: new Date(),
        deadline,
        updated_at: new Date(),
        created_by: user?.id,
        tags,
      };

      const { error: insertProjectError } = await supabase
        .from("projects")
        .insert([newProject]);

      if (insertProjectError) {
        throw new Error(insertProjectError.message);
      }

      if (selectedImages.length > 0) {
        try {
          await handleAddAttachmentToDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      toast.success("Project added successfully!");
      projectsRefetch();
      onClose();
    } catch (error) {
      toast.error("Failed to add project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-xl w-4xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Add Project
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
        <EditProjectModalContentProjectName
          projectName={projectName}
          setProjectName={setProjectName}
          disabled={isSubmitting}
        />

        <EditProjectModalContentProjectDescription
          description={description}
          setDescription={setDescription}
          disabled={isSubmitting}
        />

        <div className="flex items-start gap-8">
          <AddProjectModalContentProjectTeam
            userTeams={userTeams}
            handleTeamSelect={handleTeamSelect}
            disabled={isSubmitting}
          />

          <AddProjectModalContentProjectDeadline
            handleDateChange={handleDateChange}
            disabled={isSubmitting}
          />
        </div>

        <AddProjectModalContentProjectAttachments
          selectedImages={selectedImages}
          handleRemoveAttachment={handleRemoveAttachment}
          handleAddAttachment={handleAddAttachment}
          disabled={isSubmitting}
        />

        <EditProjectModalContentTags
          tags={tags}
          handleRemoveTag={handleRemoveTag}
          newTag={newTag}
          setNewTag={setNewTag}
          handleAddTag={handleAddTag}
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-2 flex justify-end">
        <EditProjectModalContentButtons
          onClose={onClose}
          disabled={isSubmitting}
          notConfirmed={emptyField}
          handleSave={handleAddProject}
        />
      </div>
    </div>
  );
}

export default AddProjectModalContent;
