interface EditProjectModalContentProjectDescriptionProps {
  description: string | null;
  setDescription: (value: string) => void;
  disabled: boolean;
}

function EditProjectModalContentProjectDescription({
  description,
  setDescription,
  disabled,
}: EditProjectModalContentProjectDescriptionProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="Project-description"
        className="text-sm font-medium tracking-0.1 text-gray-800"
      >
        Description
      </label>
      <textarea
        id="Project-description"
        aria-label="Project description"
        value={description!}
        placeholder="Enter project description"
        disabled={disabled}
        onChange={(e) => setDescription(e.target.value)}
        className="h-36 w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
      />
    </div>
  );
}

export default EditProjectModalContentProjectDescription;
