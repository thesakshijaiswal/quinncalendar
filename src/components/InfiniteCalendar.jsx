import { useState } from "react";
import journalData from "../data/journal.json";
import Header from "./Header";
import CalendarMonth from "./CalendarMonth";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { parseJournalEntries } from "../utils/dateUtils";
import JournalCarousel from "./JournalCarousel";

const InfiniteCalendar = () => {
  const journalEntries = parseJournalEntries(journalData);
  const now = new Date();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [months, setMonths] = useState([
    {
      year: now.getFullYear(),
      month: now.getMonth(),
      key: `${now.getFullYear()}-${now.getMonth()}`,
    },
  ]);

  const { currentMonth, currentYear, scrollContainerRef, monthRefs } =
    useInfiniteScroll(months, setMonths);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsCarouselOpen(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
    setSelectedEntry(null);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header currentMonth={currentMonth} currentYear={currentYear} />
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex-1 overflow-y-auto"
      >
        {months.map((monthData) => (
          <CalendarMonth
            key={monthData.key}
            year={monthData.year}
            month={monthData.month}
            monthKey={monthData.key}
            onEntryClick={handleEntryClick}
            journalEntries={journalEntries}
            monthRefs={monthRefs}
          />
        ))}
      </div>

      <JournalCarousel
        isOpen={isCarouselOpen}
        onClose={handleCloseCarousel}
        initialEntry={selectedEntry}
        journalData={journalData}
      />
    </div>
  );
};

export default InfiniteCalendar;
