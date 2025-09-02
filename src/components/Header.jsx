import { PiCalendarStarFill } from "react-icons/pi";
const Header = () => {
  return (
    <div className="flex items-center bg-indigo-100/20 px-4 py-3 shadow-sm">
      <PiCalendarStarFill className="mr-3 text-indigo-500" size={40} />
      <span className="mr-1 text-base font-medium text-indigo-500 md:text-lg">
        My
      </span>
      <span className="text-base font-medium text-gray-600 md:text-lg">
        Hair Diary
      </span>
    </div>
  );
};

export default Header;
