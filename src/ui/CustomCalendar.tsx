import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSchedules } from "../features/schedule/useSchedules";
import { useUsers } from "../features/dashboard/useUsers";
import { useProjects } from "../features/projects/useProjects";
import Spinner from "./Spinner";
import "../styles/CustomCalendar.css";
import toast from "react-hot-toast";
import {
  addDefaultSrc,
  capitalizeAllFirstLetters,
  capitalizeFirstLetter,
} from "../utils/helpers";
import Button from "./Button";

function CustomCalendar() {
  const {
    schedules,
    isLoading: schedulesIsLoading,
    error: schedulesError,
  } = useSchedules();

  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useProjects();

  if (schedulesIsLoading || usersIsLoading || projectsIsLoading)
    return <Spinner />;

  const today = new Date();

  const events =
    schedules?.data?.map((schedule) => {
      const isCompleted = schedule.completed;
      const eventDate = new Date(schedule.date!);

      let classNames = "font-roboto text-sm tracking-0.1";

      if (isCompleted) {
        classNames += " bg-success-50 text-success-700";
      } else {
        if (eventDate < today) {
          classNames += " bg-error-50 text-error-700";
        } else {
          classNames += " bg-gray-200 text-gray-800";
        }
      }

      return {
        title: schedule.task,
        start: schedule.date,
        classNames: classNames,
      };
    }) || [];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
        events={events}
        eventClick={(info) => {
          const eventTitle = capitalizeFirstLetter(info.event.title);
          const eventSchedule = schedules?.data?.find(
            (schedule) => schedule.task === eventTitle,
          );
          const user = users?.data?.find(
            (user) => String(user.id) === eventSchedule?.assigned_to,
          );
          const eventProject = projects?.data?.find(
            (project) => project.id === eventSchedule?.project_id,
          );
          const name = capitalizeAllFirstLetters(user?.name!) || "Unknown User";
          const placeholder = "/public/avatarPlaceholder.png";
          const userAvatar = user?.avatar_url || placeholder;
          const projectName =
            capitalizeAllFirstLetters(eventProject?.name!) || "Unnamed Project";

          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-md`}
            >
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={userAvatar}
                    alt=""
                    onError={(e) => addDefaultSrc(e, "avatar")}
                    className="h-10 w-10 rounded-full object-cover object-center"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-900">
                      {name}
                    </p>
                    <p className="font-roboto text-xs tracking-0.1 text-gray-600">
                      {projectName}
                    </p>
                    <p className="font-roboto text-sm tracking-0.1 text-gray-700">
                      {eventTitle}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group flex border-l border-gray-200">
                <Button
                  onClick={() => toast.dismiss(t.id)}
                  className="border border-transparent p-4 font-roboto text-sm font-medium tracking-0.1 text-primary-800 focus:outline-none group-hover:text-primary-900"
                >
                  Close
                </Button>
              </div>
            </div>
          ));
        }}
        editable={true}
        dayHeaderClassNames="text-sm font-semibold tracking-0.1 text-gray-600"
        dayCellClassNames="hover:bg-gray-100"
        viewClassNames="bg-white"
      />
    </div>
  );
}

export default CustomCalendar;
