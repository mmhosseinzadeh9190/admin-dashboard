import { Send, Trash } from "iconsax-react";
import Button from "../../ui/Button";

interface EditProjectModalContentTagsProps {
  tags: string[];
  handleRemoveTag: (tag: string) => void;
  newTag: string;
  setNewTag: (value: string) => void;
  handleAddTag: () => void;
}

function EditProjectModalContentTags({
  tags,
  handleRemoveTag,
  newTag,
  setNewTag,
  handleAddTag,
}: EditProjectModalContentTagsProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Tags
      </span>

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="relative flex max-w-48 cursor-default items-center justify-center rounded-full border border-primary-100 bg-primary-50 py-2 pl-3 pr-10"
            >
              <span className="truncate text-xs font-medium tracking-0.1 text-primary-800">
                {tag.toLowerCase()}
              </span>

              <Button
                onClick={() => handleRemoveTag(tag)}
                className="absolute right-0 rounded-full border-l border-primary-100 bg-gray-100 p-2 text-gray-700 transition-all duration-100 hover:text-error-700 focus:outline-none"
              >
                <Trash size="16" variant="Linear" />
              </Button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          id="Project-tag"
          aria-label="Project tag"
          type="text"
          value={newTag}
          placeholder="Enter new tag"
          onChange={(e) => setNewTag(e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-12 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
        />

        <Button
          type="submit"
          onClick={handleAddTag}
          className="absolute right-3 top-2 p-1 text-gray-600 hover:text-gray-700 focus:outline-none"
        >
          <Send size="18" variant="Linear" />
        </Button>
      </div>
    </div>
  );
}

export default EditProjectModalContentTags;
