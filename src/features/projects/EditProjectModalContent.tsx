import { useState } from "react";
import { CloseSquare } from "iconsax-react";
import toast from "react-hot-toast";
import { Project } from "../../services/apiProjects";
import { Schedule } from "../../services/apiSchedule";
import { User } from "../../services/apiUsers";
import { Team } from "../../services/apiTeams";
import supabase from "../../services/supabase";
import Button from "../../ui/Button";
import { generateUniqueId } from "../../utils/helpers";
import ModalContentNameInput from "./ModalContentNameInput";
import EditProjectModalContentProjectDescription from "./EditProjectModalContentProjectDescription";
import EditProjectModalContentProjectAttachments from "./EditProjectModalContentProjectAttachments";
import EditProjectModalContentProjectTaskList from "./EditProjectModalContentProjectTaskList";
import EditProjectModalContentTags from "./EditProjectModalContentTags";
import EditProjectModalContentButtons from "./EditProjectModalContentButtons";

interface EditProjectModalContentProps {
  project: Project;
  schedules: { data: Schedule[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
  teams: { data: Team[] | null; error: string | null } | undefined;
  onClose: () => void;
  onProjectUpdated: () => void;
  onScheduleUpdated: () => void;
}

function EditProjectModalContent({
  project,
  schedules,
  users,
  teams,
  onClose,
  onProjectUpdated,
  onScheduleUpdated,
}: EditProjectModalContentProps) {
  const teamMembers = teams?.data?.find(
    (team) => team.id === project.team,
  )?.members;

  const teamMembersAsUsers = teamMembers
    ?.map((memberId) => {
      const user = users?.data?.find((user) => String(user.id) === memberId);
      return user;
    })
    .filter((user) => user !== undefined);

  const [projectName, setProjectName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [attachments, setAttachments] = useState(project.attachments || []);
  const [deletedAttachments, setDeletedAttachments] = useState<string[]>([]);
  const [newAttachments, setNewAttachments] = useState<File[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedUser, setSelectedUser] = useState<User | null>(
    teamMembersAsUsers![0],
  );
  const [tasks, setTasks] = useState(project.tasks || []);
  const [savedTasks, setSavedTasks] = useState(project.tasks || []);
  const [completedTasks, setCompletedTasks] = useState<string[]>(
    project.tasks_done || [],
  );
  const [newTask, setNewTask] = useState("");
  const [newTaskActivity, setNewTaskActivity] = useState<any[]>([]);
  const [tags, setTags] = useState(project.tags || []);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notChanged =
    (projectName === project.name || projectName === "") &&
    project.description === description &&
    JSON.stringify(project.attachments) === JSON.stringify(attachments) &&
    JSON.stringify(project.tasks) === JSON.stringify(tasks) &&
    JSON.stringify(project.tasks_done) === JSON.stringify(completedTasks) &&
    JSON.stringify(project.tags) === JSON.stringify(tags);

  const handleDeleteAttachment = async (attachment: string) => {
    const { data: activitiesData, error: activitiesDataFetchError } =
      await supabase
        .from("activities")
        .select("*")
        .eq("project_id", project.id)
        .eq("type", "photo");

    if (activitiesDataFetchError) {
      throw new Error(activitiesDataFetchError.message);
    }

    for (const activity of activitiesData) {
      let content = activity.content || [];

      const filteredContent = content.filter(
        (url: string) => !deletedAttachments.includes(url),
      );

      if (filteredContent.length === 0) {
        const { error: activityDeletionError } = await supabase
          .from("activities")
          .delete()
          .eq("id", activity.id);

        if (activityDeletionError) {
          throw new Error(activityDeletionError.message);
        }
      } else {
        const { error: activityUpdateError } = await supabase
          .from("activities")
          .update({ content: filteredContent })
          .eq("id", activity.id);

        if (activityUpdateError) {
          throw new Error(activityUpdateError.message);
        }
      }
    }

    const { error: storageDeleteError } = await supabase.storage
      .from("projects-images")
      .remove([`${attachment.split("/").pop()}`]);
    if (storageDeleteError) {
      throw new Error(storageDeleteError.message);
    }

    onProjectUpdated();
  };

  const handleDeleteAttachmentFromDatabase = async () => {
    const existingAttachments = project.attachments || [];
    const filteredAttachments = existingAttachments.filter(
      (a) => !deletedAttachments.includes(a),
    );
    const updatedAttachments = [...filteredAttachments];

    const { error: projectUpdateError } = await supabase
      .from("projects")
      .update({ attachments: updatedAttachments })
      .eq("id", project.id);

    if (projectUpdateError) {
      throw new Error(projectUpdateError.message);
    }

    onProjectUpdated();
  };

  const handleRemoveAttachment = (attachment: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((a) => a !== attachment),
    );
    setDeletedAttachments([...deletedAttachments, attachment]);
  };

  const handleAddAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray = Array.from(files!);
    const newSelectedAttachments = filesArray.map((file) =>
      URL.createObjectURL(file),
    );

    setAttachments((prevAttachments) => [
      ...prevAttachments,
      ...newSelectedAttachments,
    ]);

    setNewAttachments((prevAttachments) => [...prevAttachments, ...filesArray]);
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

    for (const newAttachment of newAttachments) {
      const uploadResult = await handleImageUpload(newAttachment as File);

      if (uploadResult && uploadResult.publicUrl) {
        imageUrls.push(uploadResult.publicUrl);
      } else {
        throw new Error();
      }
    }

    const existingAttachments = project.attachments || [];
    const updatedAttachments = [...existingAttachments, ...imageUrls];

    const { error: projectUpdateError } = await supabase
      .from("projects")
      .update({ attachments: updatedAttachments })
      .eq("id", project.id);

    if (projectUpdateError) {
      throw new Error(projectUpdateError.message);
    }

    const activityData = {
      id: generateUniqueId(),
      content: imageUrls,
      project_id: project.id,
      user_id: project.created_by,
      timestamp: new Date(),
      type: "photo",
    };

    const { error: insertActivityDataError } = await supabase
      .from("activities")
      .insert([activityData]);

    if (insertActivityDataError) {
      throw new Error(insertActivityDataError.message);
    }

    onProjectUpdated();
  };

  const handleCheckboxChange = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((t) => t !== task));
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  const getTaskInfo = (task: string) => {
    const schedule = schedules?.data?.find(
      (schedule) => schedule.task === task,
    );
    const assignedUser = users?.data?.find(
      (user) => String(user.id) === schedule?.assigned_to,
    );
    return { schedule, assignedUser };
  };

  const handleUserSelect = (member: User) => {
    setSelectedUser(member);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleRemoveSavedTask = (task: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    setCompletedTasks(completedTasks.filter((t) => t !== task));
    setSavedTasks((prevTasks) => prevTasks.filter((t) => t !== task));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      toast.error("Please enter a task name.");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a valid due date.");
      return;
    }
    if (!selectedUser) {
      toast.error("Please select a valid user.");
      return;
    }
    if (tasks.includes(newTask.trim())) {
      toast.error("This task already exists.");
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTaskActivity([
      ...newTaskActivity,
      [newTask, selectedDate, selectedUser],
    ]);
    setNewTask("");
  };

  const handleRemoveTask = (task: string, index: number) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    setCompletedTasks(completedTasks.filter((t) => t !== task));
    setNewTaskActivity((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleInsertTask = async (task: any[]) => {
    const completed = completedTasks.includes(task[0]);

    const taskSchedule = {
      id: generateUniqueId(),
      project_id: project.id,
      assigned_to: task[2].id,
      date: new Date(task[1]),
      task: task[0],
      completed,
    };

    const { error: taskScheduleInsertError } = await supabase
      .from("schedules")
      .insert([taskSchedule]);

    if (taskScheduleInsertError) {
      throw new Error(taskScheduleInsertError.message);
    }

    const taskActivity = {
      id: generateUniqueId(),
      content: [task[0]],
      project_id: project.id,
      user_id: task[2].id,
      timestamp: task[1],
      type: "task",
    };

    const { error: taskActivityInsertError } = await supabase
      .from("activities")
      .insert([taskActivity]);

    if (taskActivityInsertError) {
      throw new Error(taskActivityInsertError.message);
    }

    onScheduleUpdated();
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
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

  const handleSave = async () => {
    try {
      setIsSubmitting(true);

      const status =
        tasks.length === 0 && completedTasks.length === 0
          ? project.status
          : tasks.length === completedTasks.length
            ? "done"
            : "run";

      const updatedProject = {
        ...project,
        name: projectName,
        description,
        tasks,
        tasks_done: completedTasks,
        status,
        updated_at: new Date(),
        tags,
      };

      const { error: projectActivityUpdateError } = await supabase
        .from("projects")
        .update(updatedProject)
        .eq("id", project.id)
        .select();

      if (projectActivityUpdateError) {
        throw new Error(projectActivityUpdateError.message);
      }

      for (const attachment of deletedAttachments) {
        try {
          await handleDeleteAttachment(attachment);
        } catch (error) {
          throw new Error();
        }
      }

      if (deletedAttachments.length > 0) {
        try {
          handleDeleteAttachmentFromDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      if (newAttachments.length > 0) {
        try {
          handleAddAttachmentToDatabase();
        } catch (error) {
          throw new Error();
        }
      }

      for (const task of newTaskActivity) {
        try {
          await handleInsertTask(task);
        } catch (error) {
          throw new Error();
        }
      }

      toast.success("Project updated successfully!");
      onProjectUpdated();
      onClose();
    } catch (error) {
      toast.error("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-xl w-4xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Edit Project
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
          name={projectName}
          setName={setProjectName}
          disabled={isSubmitting}
        />

        <EditProjectModalContentProjectDescription
          description={description}
          setDescription={setDescription}
          disabled={isSubmitting}
        />

        <EditProjectModalContentProjectAttachments
          attachments={attachments}
          handleRemoveAttachment={handleRemoveAttachment}
          handleAddAttachment={handleAddAttachment}
          disabled={isSubmitting}
        />

        <EditProjectModalContentProjectTaskList
          savedTasks={savedTasks}
          getTaskInfo={getTaskInfo}
          completedTasks={completedTasks}
          handleCheckboxChange={handleCheckboxChange}
          handleRemoveSavedTask={handleRemoveSavedTask}
          newTaskActivity={newTaskActivity}
          handleRemoveTask={handleRemoveTask}
          newTask={newTask}
          setNewTask={setNewTask}
          handleDateChange={handleDateChange}
          teamMembersAsUsers={teamMembersAsUsers}
          handleUserSelect={handleUserSelect}
          handleAddTask={handleAddTask}
          deadline={project.deadline!}
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
          notConfirmed={notChanged}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}

export default EditProjectModalContent;
