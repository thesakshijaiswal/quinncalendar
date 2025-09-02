import { useState } from "react";
import journalData from "../data/journal.json";
import Header from "./Header";
import CalendarMonth from "./CalendarMonth";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { parseJournalEntries } from "../utils/dateUtils";

const InfiniteCalendar = () => {
  const journalEntries = parseJournalEntries(journalData);
  const now = new Date();
  const [months, setMonths] = useState([
    {
      year: now.getFullYear(),
      month: now.getMonth(),
      key: `${now.getFullYear()}-${now.getMonth()}`,
    },
  ]);

  const { currentMonth, currentYear, scrollContainerRef, monthRefs } =
    useInfiniteScroll(months, setMonths);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header currentMonth={currentMonth} currentYear={currentYear} />
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollBehavior: "auto" }}
      >
        {months.map(({ year, month, key }) => (
          <CalendarMonth
            key={key}
            year={year}
            month={month}
            monthKey={key}
            journalEntries={journalEntries}
            monthRefs={monthRefs}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCalendar;
