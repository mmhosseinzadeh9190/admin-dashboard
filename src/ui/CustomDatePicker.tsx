import { Calendar } from "iconsax-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { iconColor } from "../styles/GlobalStyles";
import "../styles/CustomDatePicker.css";

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
  deadline?: string;
  fullWidth?: boolean;
  disabled: boolean;
}

function CustomDatePicker({
  onDateChange,
  deadline,
  fullWidth,
  disabled,
}: CustomDatePickerProps) {
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
        minDate={new Date()}
        maxDate={deadline ? new Date(deadline.replace(" ", "T")) : undefined}
        onKeyDown={handleKeyDown}
        icon={
          <span aria-hidden="true" className="pointer-events-none">
            <Calendar size="16" color={iconColor} variant="Linear" />
          </span>
        }
        placeholderText="Pick date"
        className={`${fullWidth ? "full-width-padding w-full rounded-xl bg-gray-100 disabled:bg-gray-200" : "normal-width-padding w-40 rounded-lg bg-white py-2 pl-8 pr-3 disabled:bg-gray-100"} cursor-pointer border border-gray-200 font-roboto text-sm/4 tracking-0.1 text-gray-800 caret-transparent placeholder:font-light placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed`}
        calendarClassName="border-gray-200 rounded-xl overflow-hidden shadow-[0_5px_15px_0] shadow-gray-800/10"
        showPopperArrow={false}
        closeOnScroll={true}
        todayButton="Today"
        calendarStartDay={6}
        disabled={disabled}
      />
    </span>
  );
}

export default CustomDatePicker;
