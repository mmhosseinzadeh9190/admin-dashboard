import CustomCalendar from "../ui/CustomCalendar";

function Schedule() {
  return (
    <div className="flex h-full flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
          Schedule
        </h1>
      </div>

      <div>
        <CustomCalendar />
      </div>
    </div>
  );
}

export default Schedule;
