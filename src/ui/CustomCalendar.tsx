import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../services/apiSchedule";
import Spinner from "./Spinner";
import "../styles/CustomCalendar.css";

function CustomCalendar() {
  const {
    data: schedules,
    isLoading: schedulesIsLoading,
    error: schedulesError,
  } = useQuery({
    queryKey: ["schedule"],
    queryFn: getSchedules,
  });

  if (schedulesIsLoading) return <Spinner />;

  const today = new Date();

  const events =
    schedules?.data?.map((schedule) => {
      const isCompleted = schedule.completed;
      const eventDate = new Date(schedule.date!);

      let classNames = "font-roboto text-sm tracking-0.1";

      if (!isCompleted) {
        classNames += " bg-error-50 text-error-600";
      } else {
        if (eventDate < today) {
          classNames += " bg-gray-200 text-gray-600";
        } else {
          classNames += " bg-success-50 text-success-600";
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
          const eventTitle = info.event.title;
          alert(`Event: ${eventTitle}`);
        }}
        editable={true}
        dayHeaderClassNames="text-sm font-semibold tracking-0.1 text-gray-600"
        dayCellClassNames="hover:bg-primary-50"
        viewClassNames="bg-white"
      />
    </div>
  );
}

export default CustomCalendar;
