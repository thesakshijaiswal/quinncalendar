import { useEffect, useRef } from "react";
import CalendarDay from "./CalenderDay";
import { monthNames, dayNames, generateCalendarDays } from "../utils/dateUtils";

const CalendarMonth = ({
  year,
  month,
  monthKey,
  onEntryClick,
  journalEntries,
  monthRefs,
}) => {
  const monthRef = useRef(null);
  const calendarDays = generateCalendarDays(year, month, journalEntries);

  useEffect(() => {
    if (monthRef.current) {
      monthRefs.current[monthKey] = monthRef.current;
    }
    return () => {
      if (monthRefs.current[monthKey]) {
        delete monthRefs.current[monthKey];
      }
    };
  }, [monthKey, monthRefs]);

  return (
    <div
      ref={monthRef}
      className="mb-4 rounded-lg bg-white shadow-sm"
      data-month-key={monthKey}
    >
      <div className="border-b border-gray-100 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {monthNames[month]} {year}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-0 border-b border-gray-100 bg-indigo-400/10">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-xs font-semibold text-gray-600 uppercase md:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {calendarDays.map((dayData, index) => (
          <CalendarDay
            key={`${monthKey}-${index}`}
            dayData={dayData}
            onEntryClick={onEntryClick}
            journalEntries={journalEntries}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
