import { Calendar } from "iconsax-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { iconColor } from "../styles/GlobalStyles";
import "../styles/CustomDatePicker.css";

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
}

function CustomDatePicker({ onDateChange }: CustomDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date | null) => {
    setStartDate(date!);
    onDateChange(date!);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <span>
      <DatePicker
        showIcon
        fixedHeight
        selected={startDate}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        icon={
          <span aria-hidden="true" className="pointer-events-none">
            <Calendar size="16" color={iconColor} variant="Linear" />
          </span>
        }
        placeholderText="Pick date"
        className="w-40 cursor-pointer rounded-lg border border-gray-200 bg-white font-roboto text-sm/5 tracking-0.1 text-gray-800 caret-transparent placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200"
        calendarClassName="border-gray-200 rounded-xl overflow-hidden shadow-[0_5px_15px_0] shadow-gray-800/10"
        showPopperArrow={false}
        closeOnScroll={true}
        todayButton="Today"
        calendarStartDay={6}
        clearButtonClassName="pr-2"
      />
    </span>
  );
}

export default CustomDatePicker;
