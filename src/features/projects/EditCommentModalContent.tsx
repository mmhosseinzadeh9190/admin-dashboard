import { useEffect, useRef, useState } from "react";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { ArrowLeft, CloseSquare, TickSquare } from "iconsax-react";
import PreMadeButtons from "../../ui/PreMadeButtons";

interface EditCommentFormProps {
  commentId: string;
  initialContent: string;
  onEditSuccess: () => void;
  onClose: () => void;
}

function EditCommentModalContent({
  commentId,
  initialContent,
  onEditSuccess,
  onClose,
}: EditCommentFormProps) {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(content.length, content.length);
    }
  }, [content]);

  const handleUpdate = async () => {
    setIsSubmitting(true);

    const updatedContent = `{${content}}`;

    const { error } = await supabase
      .from("activities")
      .update({ content: updatedContent })
      .eq("id", commentId);

    if (error) {
      toast.error("Failed to update comment. Please try again.");
    } else {
      toast.success("Comment updated successfully!");
      onEditSuccess();
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="flex w-96 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Edit Comment
        </h2>

        <Button onClick={onClose} className="text-gray-600 hover:text-gray-700">
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <textarea
        ref={textareaRef}
        aria-label="Edit Comment Place"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
        className="h-36 w-full resize-none rounded-lg border border-gray-200 bg-gray-100 p-2 font-roboto tracking-0.1 text-gray-800 focus:outline-none"
      />

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
            type="confirm"
            text="Confirm"
            onClick={handleUpdate}
            disabled={
              !content.trim() || content === initialContent || isSubmitting
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default EditCommentModalContent;
