import { Edit, Message, Trash } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import {
  addDefaultSrc,
  capitalizeAllFirstLetters,
  capitalizeFirstLetter,
  formatISODateToCustomFormat,
} from "../../utils/helpers";
import CustomDropdown from "../../ui/CustomDropdown";
import { Project } from "../../services/apiProjects";
import { Activity } from "../../services/apiActivity";
import { User } from "../../services/apiUsers";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { ReactNode, useState } from "react";
import Modal from "../../ui/Modal";
import EditCommentModalContent from "./EditCommentModalContent";
import DeleteCommentModalContent from "./DeleteCommentModalContent";

interface ProjectDetailsCommentsListProps {
  project: Project;
  activities: { data: Activity[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
  user: SupabaseUser;
  onActivitiesUpdated: () => void;
}

function ProjectDetailsCommentsList({
  project,
  activities,
  users,
  user,
  onActivitiesUpdated,
}: ProjectDetailsCommentsListProps) {
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

  const handleActivitiesRefetch = async () => {
    onActivitiesUpdated();
    setModalContent(null);
  };

  const projectComments = activities?.data
    ?.filter(
      (activity) =>
        activity.project_id === project.id && activity.type === "comment",
    )
    ?.sort(
      (a, b) =>
        new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime(),
    );

  const getCommentUser = (comment: Activity) => {
    return users?.data?.find((user) => String(user.id) === comment.user_id);
  };

  const placeholderAvatar = "/public/avatarPlaceholder.png";

  return (
    <>
      <div className="flex gap-4">
        <Message size="20" color={iconColor} variant="Linear" />
        <h3 className="font-semibold tracking-0.1 text-gray-900">
          Comments ({projectComments?.length})
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {projectComments?.map((comment) => {
          const commentUser = getCommentUser(comment);

          const dropdownItems = [];

          if (
            user?.id === project.created_by &&
            String(comment.user_id) !== user?.id
          ) {
            dropdownItems.push({
              icon: <Trash size="16" variant="Linear" />,
              label: "Delete",
              onClick: () =>
                handleOpenModal(
                  <DeleteCommentModalContent
                    commentId={String(comment.id)}
                    onDeleteSuccess={handleActivitiesRefetch}
                    onClose={() => setIsModalOpen(false)}
                  />,
                ),
            });
          }

          if (String(comment.user_id) === user?.id) {
            dropdownItems.push({
              icon: <Edit size="16" variant="Linear" />,
              label: "Edit",
              onClick: () => {
                handleOpenModal(
                  <EditCommentModalContent
                    commentId={String(comment.id)}
                    initialContent={comment.content![0]}
                    onEditSuccess={handleActivitiesRefetch}
                    onClose={() => setIsModalOpen(false)}
                  />,
                );
              },
            });
            dropdownItems.push({
              icon: <Trash size="16" variant="Linear" />,
              label: "Delete",
              onClick: () =>
                handleOpenModal(
                  <DeleteCommentModalContent
                    commentId={String(comment.id)}
                    onDeleteSuccess={handleActivitiesRefetch}
                    onClose={() => setIsModalOpen(false)}
                  />,
                ),
            });
          }

          return (
            <div className="flex items-start" key={comment.id}>
              <img
                src={commentUser?.avatar_url || placeholderAvatar}
                alt=""
                onError={(e) => addDefaultSrc(e, "avatar")}
                className="z-10 h-10 w-10 rounded-full border-4 border-white object-cover object-center"
              />
              <div className="-ml-5 mt-3.5 flex w-full flex-col gap-2 overflow-hidden rounded-2.5xl bg-gray-100 p-4 pl-7">
                <div className="flex items-center gap-3">
                  <span className="mr-auto text-sm font-semibold tracking-0.1 text-gray-900">
                    {String(commentUser?.id) === user?.id
                      ? "You"
                      : capitalizeAllFirstLetters(commentUser?.name!)}
                  </span>
                  <span className="font-roboto text-xs tracking-0.1 text-gray-600">
                    {formatISODateToCustomFormat(comment.timestamp!)}
                  </span>

                  {dropdownItems.length > 0 && (
                    <CustomDropdown
                      items={dropdownItems.map((item) => ({
                        ...item,
                        onClick: item.onClick,
                      }))}
                    />
                  )}
                </div>

                <span className="break-words font-roboto text-sm tracking-0.1 text-gray-800">
                  {capitalizeFirstLetter(comment.content![0])}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </>
  );
}

export default ProjectDetailsCommentsList;
