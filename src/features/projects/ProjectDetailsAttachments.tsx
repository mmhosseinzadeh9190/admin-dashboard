import { Paperclip2 } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import { Project } from "../../services/apiProjects";
import { addDefaultSrc } from "../../utils/helpers";

interface ProjectDetailsAttachmentsProps {
  project: Project;
}

function ProjectDetailsAttachments({
  project,
}: ProjectDetailsAttachmentsProps) {
  const placeholderImage = "/public/imagePlaceholder.png";

  return (
    <div className="flex gap-4">
      <div>
        <Paperclip2 size="20" color={iconColor} variant="Linear" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold tracking-0.1 text-gray-900">Attachment</h3>
        <div className="flex flex-wrap gap-4">
          {project.attachments?.map((attachment) => (
            <img
              key={attachment}
              src={attachment || placeholderImage}
              alt=""
              onError={(e) => addDefaultSrc(e, "image")}
              className="h-44 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsAttachments;
