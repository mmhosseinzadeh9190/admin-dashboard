interface EditProjectModalContentProjectNameProps {
  name: string | null;
  setName: (value: string) => void;
  title?: string;
  disabled: boolean;
}

function ModalContentNameInput({
  name,
  setName,
  title,
  disabled,
}: EditProjectModalContentProjectNameProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={title?.replace(" ", "-") || "Project-name"}
        className="text-sm font-medium tracking-0.1 text-gray-800"
      >
        {title || "Project name"}
      </label>
      <input
        id={title?.replace(" ", "-") || "Project-name"}
        aria-label={title || "Project name"}
        type="text"
        value={name!}
        placeholder={`Enter ${title?.toLowerCase() || "project name"}`}
        disabled={disabled}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
      />
    </div>
  );
}

export default ModalContentNameInput;
