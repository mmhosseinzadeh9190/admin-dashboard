import { useState } from "react";
import toast from "react-hot-toast";
import { CloseSquare } from "iconsax-react";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";
import PreMadeButtons from "../../ui/PreMadeButtons";

interface DeleteConfirmationModalProps {
  commentId: string;
  onDeleteSuccess: () => void;
  onClose: () => void;
}

function DeleteCommentModalContent({
  commentId,
  onDeleteSuccess,
  onClose,
}: DeleteConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);

    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", commentId);

    if (error) {
      toast.error("Failed to delete comment. Please try again.");
    } else {
      toast.success("Comment deleted successfully!");
      onDeleteSuccess();
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="flex w-96 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Delete Comment
        </h2>

        <Button onClick={onClose} className="text-gray-600 hover:text-gray-700">
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to delete this comment?
      </p>

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
            type="delete"
            text="Delete"
            onClick={handleDelete}
            disabled={isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteCommentModalContent;
