import { useState } from "react";
import { CloseSquare, Danger, Eye, EyeSlash, Trash } from "iconsax-react";
import Button from "../../ui/Button";
import PreMadeButtons from "../../ui/PreMadeButtons";
import { logout, signInWithPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";
import supabase, { supabaseServiceRole } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User } from "../../services/apiUsers";
import { Activity } from "../../services/apiActivity";
import { Team } from "../../services/apiTeams";
import { getProject, Project } from "../../services/apiProjects";
import { useQueryClient } from "@tanstack/react-query";

type DeleteAccountModalContentProps = {
  supabaseUser: SupabaseUser | null | undefined;
  user: User;
  activities: { data: Activity[] | null; error: string | null };
  teams: { data: Team[] | null; error: string | null };
  projects: { data: Project[] | null; error: string | null };
  onClose: () => void;
};

function DeleteAccountModalContent({
  supabaseUser,
  user,
  activities,
  teams,
  projects,
  onClose,
}: DeleteAccountModalContentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userActivities =
    activities?.data?.filter(
      (activity) => activity.user_id === String(user?.id),
    ) || [];

  const userProjects =
    projects?.data?.filter(
      (project) => project.created_by === String(user?.id),
    ) || [];

  const userCreatedTeams =
    teams?.data?.filter((team) => team.leader_id === String(user?.id)) || [];

  const userTeams =
    teams?.data?.filter((team) => team.members?.includes(String(user?.id))) ||
    [];

  const activitiesWithPhotoType = userActivities.filter(
    (activity) => activity.type === "photo",
  );

  const activitiesWithTaskType = userActivities.filter(
    (activity) => activity.type === "task",
  );

  const providers = ["facebook", "twitter", "github"];

  const userProvider = supabaseUser?.app_metadata.provider!;

  const isProviderEmail = !providers.includes(userProvider);

  let disableDelete: boolean;

  isProviderEmail
    ? (disableDelete = email === "" || password === "" || !deleteAccount)
    : (disableDelete = email === "" || !deleteAccount);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDeleteProject = async (project: Project) => {
    try {
      if (project.attachments?.length! > 0) {
        for (const attachment of project.attachments!) {
          const { error: storageDeleteError } = await supabase.storage
            .from("projects-images")
            .remove([`${attachment.split("/").pop()}`]);
          if (storageDeleteError) {
            throw new Error(storageDeleteError.message);
          }
        }
      }

      const { error: activitiesError } = await supabase
        .from("activities")
        .delete()
        .eq("project_id", project.id);
      if (activitiesError) {
        throw new Error(activitiesError.message);
      }

      const { error: schedulesError } = await supabase
        .from("schedules")
        .delete()
        .eq("project_id", project.id);
      if (schedulesError) {
        throw new Error(schedulesError.message);
      }

      const { error: projectError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);
      if (projectError) {
        throw new Error(projectError.message);
      }

      const filteredTeamProjectsId = teams.data
        ?.find((team) => team.id === project.team)
        ?.projects_id?.filter((id) => +id !== project.id);

      const { error: updateTeamError } = await supabase
        .from("teams")
        .update({ projects_id: filteredTeamProjectsId })
        .eq("id", project.team);
      if (updateTeamError) {
        throw new Error(updateTeamError.message);
      }
    } catch (error) {
      throw new Error();
    }
  };

  const handleDeleteTeam = async (team: Team) => {
    try {
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
      }

      const { error: teamDeleteError } = await supabase
        .from("teams")
        .delete()
        .eq("id", team.id);
      if (teamDeleteError) {
        throw new Error(teamDeleteError.message);
      }
    } catch (error) {
      throw new Error();
    }
  };

  const handleDeleteRemainingData = async () => {
    try {
      activitiesWithPhotoType.map(async (activity) => {
        const project = await getProject(String(activity.project_id));
        activity.content?.map(async (attachment) => {
          const { error: storageDeleteError } = await supabase.storage
            .from("projects-images")
            .remove([`${attachment.split("/").pop()}`]);
          if (storageDeleteError) {
            throw new Error(storageDeleteError.message);
          }
        });
        const filteredAttachments =
          project.data?.attachments?.filter(
            (a) => !activity.content?.includes(a),
          ) || [];
        const updatedAttachments = [...filteredAttachments];
        const { error: projectUpdateError } = await supabase
          .from("projects")
          .update({ attachments: updatedAttachments })
          .eq("id", project.data?.id);
        if (projectUpdateError) {
          throw new Error(projectUpdateError.message);
        }
      });

      activitiesWithTaskType.map(async (activity) => {
        const project = await getProject(String(activity.project_id));
        const task = activity.content?.at(0);
        const filteredTasks =
          project.data?.tasks?.filter((t) => t !== task) || [];
        const updatedTasks = [...filteredTasks];
        const { error: tasksUpdateError } = await supabase
          .from("projects")
          .update({ tasks: updatedTasks })
          .eq("id", project.data?.id);
        if (tasksUpdateError) {
          throw new Error(tasksUpdateError.message);
        }

        if (project.data?.tasks_done?.includes(task!)) {
          const filteredCompletedTasks = project.data?.tasks_done?.filter(
            (t) => t !== task,
          );
          const updatedCompletedTasks = [...filteredCompletedTasks!];
          const { error: completedTasksUpdateError } = await supabase
            .from("projects")
            .update({ tasks_done: updatedCompletedTasks })
            .eq("id", project.data?.id);
          if (completedTasksUpdateError) {
            throw new Error(completedTasksUpdateError.message);
          }
        }
      });

      const { error: activitiesError } = await supabase
        .from("activities")
        .delete()
        .eq("user_id", user?.id);
      if (activitiesError) {
        throw new Error(activitiesError.message);
      }

      const { error: schedulesError } = await supabase
        .from("schedules")
        .delete()
        .eq("assigned_to", user?.id);
      if (schedulesError) {
        throw new Error(schedulesError.message);
      }

      userTeams.map(async (team) => {
        const filteredTeamMembers =
          team.members?.filter((member) => member !== String(user?.id)) || [];
        const { error: updateTeamError } = await supabase
          .from("teams")
          .update({
            members: filteredTeamMembers,
            team_size: filteredTeamMembers?.length,
          })
          .eq("id", team.id);
        if (updateTeamError) {
          throw new Error(updateTeamError.message);
        }
      });
    } catch (error) {
      throw new Error();
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (
        user.avatar_url !==
        "https://grrbotnrdjqbvjpugvan.supabase.co/storage/v1/object/public/avatars//user-placeholder.png"
      ) {
        const { error: storageDeleteError } = await supabase.storage
          .from("avatars")
          .remove([`${user.avatar_url?.split("/").pop()}`]);
        if (storageDeleteError) {
          throw new Error(storageDeleteError.message);
        }
      }

      const { error: userDeleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", user?.id);
      if (userDeleteError) {
        throw new Error(userDeleteError.message);
      }
    } catch (error) {
      throw new Error();
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);

      if (email !== user?.email) {
        toast.error("Provided email is incorrect.");
        return;
      }

      if (userProvider === "email") {
        try {
          await signInWithPassword({
            email,
            password,
          });
        } catch (error) {
          toast.error("Provided email or password are incorrect.");
          return;
        }
      }

      if (userProjects.length > 0) {
        for (const project of userProjects) {
          await handleDeleteProject(project);
        }
      }

      if (userCreatedTeams.length > 0) {
        for (const team of userCreatedTeams) {
          await handleDeleteTeam(team);
        }
      }

      await handleDeleteRemainingData();

      await handleDeleteUser();

      const { error } = await supabaseServiceRole.auth.admin.deleteUser(
        String(user?.id),
      );
      if (error) {
        throw new Error(error.message);
      }

      await logout();
      queryClient.removeQueries();
      navigate("/login");
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete your account. Please try again.");
    } finally {
      setEmail("");
      setPassword("");
      setDeleteAccount(false);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex w-xl flex-col gap-6" onSubmit={handleDeleteAccount}>
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Delete Account
        </h2>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed"
        >
          <CloseSquare size="20" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to delete your account?{" "}
        <span className="font-medium text-error-700">
          This action cannot be undone.
        </span>
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-y border-error-100 bg-error-50 px-6 py-4 text-error-700">
          <Danger size="16" />
          <span className="font-roboto text-sm font-medium tracking-0.1">
            This is extremely important.
          </span>
        </div>
        <p className="font-roboto text-sm font-semibold tracking-0.1 text-gray-800">
          We will immediately delete all of your projects, along with all of
          your teams, tasks and activities.
        </p>

        <div className="flex flex-col gap-2.5 border-y border-gray-200 py-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-roboto text-sm tracking-0.1 text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>
          {isProviderEmail && (
            <div className="relative flex flex-col gap-1">
              <label
                htmlFor="password"
                className="font-roboto text-sm tracking-0.1 text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-11 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
                placeholder="Enter your password"
                required
              />
              <Button
                onClick={togglePasswordVisibility}
                className="absolute bottom-3 right-3.5 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlash size="16" className="text-gray-600" />
                ) : (
                  <Eye size="16" className="text-gray-600" />
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            id="delete-account"
            aria-describedby="delete-account"
            type="checkbox"
            checked={deleteAccount}
            onChange={() => setDeleteAccount(!deleteAccount)}
            disabled={isSubmitting}
            className="mt-1 h-3.5 w-3.5 accent-primary-800 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="delete-account"
            className="font-roboto text-sm tracking-0.1 text-gray-700"
          >
            I have read the information stated above and understand the
            implications of having my profile deleted. I wish to proceed with
            the deletion of my profile.
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex w-2/3 gap-3">
          <PreMadeButtons
            type="cancel"
            text="Cancel"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full"
          />

          <Button
            type="submit"
            disabled={isSubmitting || disableDelete}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-error-100 bg-error-50 px-3.5 py-2.5 text-error-700 hover:bg-error-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
          >
            <Trash size="16" variant="Linear" />
            <span className="text-sm font-medium tracking-0.1">Delete</span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default DeleteAccountModalContent;
