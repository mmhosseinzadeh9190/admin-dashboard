import { CloseCircle, Paperclip, Send } from "iconsax-react";
import Button from "../../ui/Button";
import { addDefaultSrc, generateUniqueId } from "../../utils/helpers";
import { useRef, useState } from "react";
import { Project } from "../../services/apiProjects";
import { User } from "@supabase/supabase-js";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";

interface ProjectDetailsCommentsFormProps {
  project: Project;
  user: User;
  onActivitiesUpdated: () => void;
  onProjectUpdated: () => void;
}

function ProjectDetailsCommentsForm({
  project,
  user,
  onActivitiesUpdated,
  onProjectUpdated,
}: ProjectDetailsCommentsFormProps) {
  const [comment, setComment] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const placeholderAvatar = "/public/avatarPlaceholder.png";

  const handleImageRemove = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    if (updatedImages.length === 0) {
      setComment("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      toast.error("Failed to upload image. Please try again.");
      return null;
    }

    const { data } = supabase.storage
      .from("projects-images")
      .getPublicUrl(newFileName);

    toast.success("Image uploaded successfully!");
    return { publicUrl: data.publicUrl };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (comment.trim() || selectedImages.length > 0) {
      if (comment.trim()) {
        const activityData = {
          id: generateUniqueId(),
          content: [comment],
          project_id: project.id,
          user_id: user?.id,
          timestamp: new Date(),
          type: "comment",
        };

        const { error } = await supabase
          .from("activities")
          .insert([activityData]);

        if (error) {
          toast.error("Failed to add comment. Please try again.");
          return;
        }

        onActivitiesUpdated();
      }

      if (selectedImages.length > 0) {
        const imageUrls: string[] = [];

        for (const image of selectedImages) {
          const uploadResult = await handleImageUpload(image);

          if (uploadResult && uploadResult.publicUrl) {
            imageUrls.push(uploadResult.publicUrl);
          }
        }

        const {
          data: existingProjectAttachments,
          error: projectAttachmentsFetchError,
        } = await supabase
          .from("projects")
          .select("attachments")
          .eq("id", project.id)
          .single();

        if (projectAttachmentsFetchError) return;

        const existingAttachments =
          existingProjectAttachments.attachments || [];

        const attachmentsToUpdate = Array.isArray(existingAttachments)
          ? existingAttachments
          : [];

        const updatedAttachments = [...attachmentsToUpdate, ...imageUrls];

        const { error: projectUpdateError } = await supabase
          .from("projects")
          .update({ attachments: updatedAttachments })
          .eq("id", project.id);

        if (projectUpdateError) {
          toast.error("Failed to update attachments. Please try again.");
        }

        const activityData = {
          id: generateUniqueId(),
          content: imageUrls,
          project_id: project.id,
          user_id: user?.id,
          timestamp: new Date(),
          type: "photo",
        };

        const { error: insertActivityDataError } = await supabase
          .from("activities")
          .insert([activityData]);

        if (insertActivityDataError) {
          toast.error(
            "Failed to register the upload photo operation as an activity",
          );
          return;
        }

        onProjectUpdated();
      }

      setComment("");
      setSelectedImages([]);
    }

    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", { bubbles: true });
      e.currentTarget.closest("form")?.dispatchEvent(formEvent);
    }
  };

  const handleClickInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-start">
      <img
        src={user?.user_metadata.avatar_url || placeholderAvatar}
        alt=""
        onError={(e) => addDefaultSrc(e, "avatar")}
        className="border-w z-10 h-10 w-10 rounded-full border-4 border-white object-cover object-center"
      />
      <div className="-ml-5 mt-3.5 flex w-full flex-col gap-2 rounded-2.5xl bg-gray-100 p-4 pl-7">
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-2">
          <div className="flex gap-2">
            {selectedImages.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3 pr-11">
                {selectedImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      className="h-44 rounded-lg"
                    />
                    {!isSubmitting && (
                      <Button
                        onClick={() => handleImageRemove(index)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-100 p-1.5 text-gray-700 shadow-md transition-all duration-100 hover:text-error-700 focus:outline-none"
                      >
                        <CloseCircle size="20" variant="Linear" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment or upload a file…"
                className="h-24 w-full resize-none rounded-lg border border-gray-200 py-2.5 pl-3.5 pr-11 font-roboto text-sm/5 tracking-0.1 text-gray-800 placeholder:text-gray-500 focus:outline-none"
              />
            )}
          </div>

          {comment.trim() || selectedImages.length > 0 ? (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-3 top-2 p-1 text-gray-600 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
            >
              <Send size="18" variant="Linear" />
            </Button>
          ) : (
            <span className="absolute right-3 top-2">
              <input
                aria-label="attachment"
                type="file"
                multiple
                accept=".jpeg, .jpg, .png, .webp"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                onClick={handleClickInput}
                className="p-1 text-gray-600 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
              >
                <Paperclip size="18" variant="Linear" />
              </Button>
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProjectDetailsCommentsForm;
