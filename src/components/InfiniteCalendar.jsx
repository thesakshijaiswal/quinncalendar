import { useState } from "react";
import { FaPlus } from "react-icons/fa";
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
  const [carouselKey, setCarouselKey] = useState(0);

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
    setCarouselKey((prev) => prev + 1);
    setIsCarouselOpen(true);
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
    setSelectedEntry(null);
  };

  const handleAddClick = () => {
    alert("Add new journal entry to QuinnCalender!");
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header currentMonth={currentMonth} currentYear={currentYear} />
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

      <button
        onClick={handleAddClick}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg transition hover:bg-indigo-700 active:scale-95 sm:h-16 sm:w-16"
      >
        <FaPlus size={20} />
      </button>

      <JournalCarousel
        key={carouselKey}
        isOpen={isCarouselOpen}
        onClose={handleCloseCarousel}
        initialEntry={selectedEntry}
        journalData={journalData}
      />
    </div>
  );
};

export default InfiniteCalendar;
