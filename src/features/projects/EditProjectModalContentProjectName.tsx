interface EditProjectModalContentProjectNameProps {
  projectName: string | null;
  setProjectName: (value: string) => void;
}

function EditProjectModalContentProjectName({
  projectName,
  setProjectName,
}: EditProjectModalContentProjectNameProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor="Project-name"
        className="text-sm font-medium tracking-0.1 text-gray-800"
      >
        Project name
      </label>
      <input
        id="Project-name"
        aria-label="Project name"
        type="text"
        value={projectName!}
        placeholder="Enter project name"
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
      />
    </div>
  );
}

export default EditProjectModalContentProjectName;
