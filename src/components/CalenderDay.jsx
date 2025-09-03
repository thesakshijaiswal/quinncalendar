const CalendarDay = ({ dayData, journalEntries, onEntryClick }) => {
  if (!dayData) {
    return (
      <div className="relative flex min-h-[80px] items-center justify-center border-r border-b border-gray-100 last:border-r-0 sm:min-h-[100px] md:min-h-[120px] lg:min-h-[160px]" />
    );
  }

  const { day, dateKey, hasEntry } = dayData;
  const dayEntries = journalEntries[dateKey] || [];

  return (
    <div
      className={`relative flex min-h-[80px] items-start justify-center border-r border-b border-gray-100 last:border-r-0 sm:min-h-[100px] md:min-h-[120px] lg:min-h-[160px] ${
        hasEntry ? "bg-indigo-50/20" : "bg-white"
      }`}
    >
      <div className="absolute top-2 left-2 z-10 text-sm font-semibold text-gray-800 sm:text-base md:text-lg lg:text-xl">
        {day}
      </div>

      {dayEntries.length > 0 && (
        <div className="mt-8 w-full pb-2 sm:mt-10 md:mt-12 lg:px-2">
          <div className="flex flex-col gap-1 sm:gap-2">
            {dayEntries.map((entry, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-1 flex w-full justify-center">
                  <div className="bg-opacity-80 rounded-sm bg-black py-0.5 text-xs font-medium text-white lg:px-2">
                    ⭐ {entry.rating}
                  </div>
                </div>

                <div
                  className="relative h-20 w-full cursor-pointer overflow-hidden rounded-md transition-transform duration-200 will-change-transform hover:scale-95 sm:h-24 md:h-28 lg:h-60"
                  onClick={() => onEntryClick(entry, dayEntries, index)}
                >
                  <img
                    src={entry.imgUrl}
                    alt="Journal entry"
                    className="h-full w-full object-cover object-top"
                    onLoad={(e) => {
                      e.target.style.opacity = "1";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
