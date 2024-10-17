import { Project } from "../../services/apiProjects";
import { Activity } from "../../services/apiActivity";
import { User } from "../../services/apiUsers";
import { User as SupabaseUser } from "@supabase/supabase-js";
import ProjectDetailsCommentsList from "./ProjectDetailsCommentsList";
import ProjectDetailsCommentsForm from "./ProjectDetailsCommentsForm";

interface ProjectDetailsCommentsProps {
  project: Project;
  activities: { data: Activity[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
  user: SupabaseUser;
  onActivitiesUpdated: () => void;
  onProjectUpdated: () => void;
}

function ProjectDetailsComments({
  project,
  activities,
  users,
  user,
  onActivitiesUpdated,
  onProjectUpdated,
}: ProjectDetailsCommentsProps) {
  return (
    <div className="flex flex-col gap-3">
      <ProjectDetailsCommentsList
        project={project}
        activities={activities}
        users={users}
        user={user}
        onActivitiesUpdated={onActivitiesUpdated}
      />

      <ProjectDetailsCommentsForm
        project={project}
        user={user}
        onActivitiesUpdated={onActivitiesUpdated}
        onProjectUpdated={onProjectUpdated}
      />
    </div>
  );
}

export default ProjectDetailsComments;
