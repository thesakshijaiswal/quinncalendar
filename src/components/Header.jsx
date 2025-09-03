import { PiCalendarStarFill } from "react-icons/pi";
import { monthNames } from "../utils/dateUtils";

const Header = ({ currentMonth, currentYear }) => {
  return (
    <div className="flex items-center bg-indigo-100/20 px-4 py-3 shadow-sm">
      <PiCalendarStarFill className="mr-3 text-indigo-500" size={40} />
      <div className="text-base font-semibold md:text-lg">
        <span className="mr-1 text-indigo-500">My</span>
        <span className="text-gray-600">Hair Diary</span>
      </div>
      <div className="ml-auto font-medium text-gray-500">
        <span className="font-semibold text-indigo-500">
          <span className="sm:hidden">
            {monthNames[currentMonth].slice(0, 3)}
          </span>
          <span className="hidden sm:inline">{monthNames[currentMonth]}</span>
        </span>{" "}
        {currentYear}
      </div>
    </div>
  );
};

export default Header;
