import StarRating from "./StarRating";

const CalendarDay = ({ dayData, journalEntries, onEntryClick }) => {
  if (!dayData) {
    return (
      <div className="relative flex min-h-[80px] items-center justify-center border-r border-b border-gray-100 last:border-r-0 sm:min-h-[100px] md:min-h-[120px] lg:min-h-[160px]" />
    );
  }

  const { day, dateKey, hasEntry } = dayData;
  const dayEntries = journalEntries[dateKey] || [];

  const getCategoryInitials = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const getCategoryColor = (category) => {
    const colors = [
      "bg-indigo-600/70",
      "bg-purple-600/70",
      "bg-blue-600/70",
      "bg-green-600/70",
      "bg-yellow-600/70",
      "bg-red-600/70",
      "bg-pink-600/70",
      "bg-orange-600/70",
      "bg-teal-600/70",
      "bg-cyan-600/70",
    ];

    const hash = category
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

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
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="mb-1 flex w-full justify-center">
                  <div className="bg-opacity-80 rounded-sm px-1 py-0.5 lg:px-2">
                    <StarRating
                      rating={entry.rating}
                      size="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
                    />
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

                {entry.categories && entry.categories.length > 0 && (
                  <div className="w-full px-1">
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                      {entry.categories.map((category, catIndex) => (
                        <div
                          key={catIndex}
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${getCategoryColor(category)} text-[7px] font-semibold text-white shadow-sm sm:h-6 sm:w-6 sm:text-xs md:h-7 md:w-7 lg:h-8 lg:w-8`}
                        >
                          {getCategoryInitials(category)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
