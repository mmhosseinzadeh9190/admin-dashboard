import ActivitiesContainer from "../features/activity/ActivitiesContainer";
import CustomSelect from "../ui/CustomSelect";

function Activity() {
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
          Activity
        </h1>

        <CustomSelect
          options={[
            { value: "due-date", label: "Due Date" },
            { value: "activity-type", label: "Activity Type" },
            { value: "project-name", label: "Project Name" },
          ]}
        />
      </div>

      <div>
        <ActivitiesContainer />
      </div>
    </div>
  );
}

export default Activity;
