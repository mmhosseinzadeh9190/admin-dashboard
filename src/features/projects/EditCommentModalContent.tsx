import { useEffect, useRef, useState } from "react";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { CloseSquare } from "iconsax-react";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(content.length, content.length);
    }
  }, [content]);

  const handleUpdate = async () => {
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
    onClose();
  };

  return (
    <div className="flex w-96 flex-col gap-5">
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
        className="mb-1 h-36 w-full resize-none rounded-lg border border-gray-200 bg-gray-100 p-2 font-roboto tracking-0.1 text-gray-800 focus:outline-none"
      />

      <div className="flex gap-3 text-sm font-medium">
        <Button
          onClick={onClose}
          className="w-full rounded-lg bg-gray-200 px-3.5 py-2.5 text-gray-800 hover:bg-gray-300 focus:outline-none"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          disabled={!content.trim() || content === initialContent}
          className="w-full rounded-lg bg-success-700 px-3.5 py-2.5 text-success-50 hover:bg-success-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default EditCommentModalContent;
