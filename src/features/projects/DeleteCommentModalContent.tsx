import toast from "react-hot-toast";
import { CloseSquare } from "iconsax-react";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";

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
  const handleDelete = async () => {
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
    onClose();
  };

  return (
    <div className="flex w-96 flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Delete Comment
        </h2>

        <Button onClick={onClose} className="text-gray-600 hover:text-gray-700">
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="mb-1 font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to delete this comment?
      </p>

      <div className="flex gap-3 text-sm font-medium">
        <Button
          onClick={onClose}
          className="w-full rounded-lg bg-gray-200 px-3.5 py-2.5 text-gray-800 hover:bg-gray-300 focus:outline-none"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          className="w-full rounded-lg bg-error-700 px-3.5 py-2.5 text-error-50 hover:bg-error-800 focus:outline-none"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default DeleteCommentModalContent;
