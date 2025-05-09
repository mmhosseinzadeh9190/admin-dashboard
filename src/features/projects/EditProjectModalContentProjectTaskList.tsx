import { Calendar, Send, Trash } from "iconsax-react";
import { Schedule } from "../../services/apiSchedule";
import { User } from "../../services/apiUsers";
import Button from "../../ui/Button";
import { iconColor } from "../../styles/GlobalStyles";
import {
  addDefaultSrc,
  capitalizeFirstLetter,
  formatISODateToCustomFormat,
} from "../../utils/helpers";
import CustomDatePicker from "../../ui/CustomDatePicker";
import CustomUsersSelect from "../../ui/CustomUsersSelect";

interface EditProjectModalContentProjectTaskListProps {
  savedTasks: string[];
  getTaskInfo: (task: string) => {
    schedule: Schedule | undefined;
    assignedUser: User | undefined;
  };
  completedTasks: string[];
  handleCheckboxChange: (task: string) => void;
  handleRemoveSavedTask: (task: string) => void;
  newTaskActivity: any[];
  handleRemoveTask: (task: string, index: number) => void;
  newTask: string;
  setNewTask: (value: string) => void;
  handleDateChange: (date: Date) => void;
  teamMembersAsUsers: User[] | undefined;
  handleUserSelect: (member: User) => void;
  handleAddTask: () => void;
  deadline: string;
  disabled: boolean;
}

function EditProjectModalContentProjectTaskList({
  savedTasks,
  getTaskInfo,
  completedTasks,
  handleCheckboxChange,
  handleRemoveSavedTask,
  newTaskActivity,
  handleRemoveTask,
  newTask,
  setNewTask,
  handleDateChange,
  teamMembersAsUsers,
  handleUserSelect,
  handleAddTask,
  deadline,
  disabled,
}: EditProjectModalContentProjectTaskListProps) {
  const placeholderImage = "/public/imagePlaceholder.png";

  return (
    <div className="flex flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Task List
      </span>

      {savedTasks.length > 0 && (
        <div className="flex flex-col gap-3">
          {savedTasks.map((task, index) => {
            const { schedule, assignedUser } = getTaskInfo(task);
            const isChecked = completedTasks.includes(task);
            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <input
                    id={`edit-modal-task-checkbox-${index}`}
                    aria-label="checkbox"
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}
                    onChange={() => handleCheckboxChange(task)}
                    className="h-3.5 w-5 accent-success-600 focus:outline-none disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor={`edit-modal-task-checkbox-${index}`}
                    className="mt-px max-w-md truncate font-roboto tracking-0.1 text-gray-800"
                  >
                    {capitalizeFirstLetter(task)}
                  </label>
                  {!disabled && (
                    <Button
                      onClick={() => handleRemoveSavedTask(task)}
                      className="ml-auto text-gray-700 transition-all duration-100 hover:text-error-700 focus:outline-none"
                    >
                      <Trash size="16" variant="Linear" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2 pl-7">
                  <span className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-600">
                    <Calendar size="16" color={iconColor} variant="Linear" />
                    {formatISODateToCustomFormat(schedule?.date!)}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assignedUser?.avatar_url || placeholderImage}
                      alt=""
                      onError={(e) => addDefaultSrc(e, "avatar")}
                      className="h-5 w-5 rounded-full border border-gray-200 object-cover object-center"
                    />
                    <span className="font-roboto text-sm text-gray-500">
                      {assignedUser?.name}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {newTaskActivity.length > 0 && (
        <div className="flex flex-col gap-3">
          {newTaskActivity.map((task, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <input
                    id={`edit-modal-new-task-checkbox-${index}`}
                    aria-label="checkbox"
                    type="checkbox"
                    disabled={disabled}
                    onChange={() => handleCheckboxChange(task[0])}
                    className="h-3.5 w-5 accent-success-600 focus:outline-none disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor={`edit-modal-new-task-checkbox-${index}`}
                    className="mt-px max-w-md truncate font-roboto tracking-0.1 text-gray-800"
                  >
                    {capitalizeFirstLetter(task[0])}
                  </label>
                  {!disabled && (
                    <Button
                      onClick={() => handleRemoveTask(task[0], index)}
                      className="ml-auto text-gray-700 transition-all duration-100 hover:text-error-700 focus:outline-none"
                    >
                      <Trash size="16" variant="Linear" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 pl-7">
                  <span className="flex items-center gap-1 font-roboto text-sm tracking-0.1 text-gray-600">
                    <Calendar size="16" color={iconColor} variant="Linear" />
                    {formatISODateToCustomFormat(task[1])}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={task[2]?.avatar_url || placeholderImage}
                      alt=""
                      onError={(e) => addDefaultSrc(e, "avatar")}
                      className="h-5 w-5 rounded-full border border-gray-200 object-cover object-center"
                    />
                    <span className="font-roboto text-sm text-gray-500">
                      {task[2]?.name}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="relative flex flex-col gap-3">
        <input
          id="Project-task"
          aria-label="Project task"
          type="text"
          value={newTask}
          placeholder="Enter new task"
          disabled={disabled}
          onChange={(e) => setNewTask(e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-3.5 pr-12 font-roboto text-sm tracking-0.1 text-gray-800 placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
        />

        <Button
          type="submit"
          disabled={disabled}
          onClick={handleAddTask}
          className="absolute right-3 top-2 p-1 text-gray-600 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed"
        >
          <Send size="18" variant="Linear" />
        </Button>

        <div className="flex w-full items-center gap-3">
          <span className="w-1/2">
            <CustomDatePicker
              onDateChange={handleDateChange}
              deadline={deadline}
              disabled={disabled}
              fullWidth={true}
            />
          </span>

          <span className="w-1/2">
            <CustomUsersSelect
              members={teamMembersAsUsers!}
              onUserSelect={handleUserSelect}
              disabled={disabled}
              fullWidth={true}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditProjectModalContentProjectTaskList;
