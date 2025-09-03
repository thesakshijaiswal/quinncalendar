import { useState, useRef, useEffect } from "react";
import StarRating from "./StarRating";
import { FaWindowClose } from "react-icons/fa";
import CarouselNavigation from "./CarouselNavigation";
import { formatDateForDisplay } from "../utils/dateUtils";
const JournalCarousel = ({ isOpen, onClose, initialEntry, journalData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen && initialEntry && journalData && activeIndex === 0) {
      const sortedEntries = [...journalData].sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
      });

      const index = sortedEntries.findIndex(
        (entry) =>
          entry.date === initialEntry.date &&
          entry.description === initialEntry.description,
      );

      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [isOpen, initialEntry, journalData]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !journalData || journalData.length === 0) return null;

  const sortedEntries = [...journalData].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateA - dateB;
  });

  const changeSlide = (newIndex) => {
    const safeIndex = Math.max(0, Math.min(newIndex, sortedEntries.length - 1));
    setActiveIndex(safeIndex);
  };

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const dragThreshold = 100;
    const dragOffset = currentX - startX;

    if (dragOffset > dragThreshold && activeIndex > 0) {
      changeSlide(activeIndex - 1);
    } else if (
      dragOffset < -dragThreshold &&
      activeIndex < sortedEntries.length - 1
    ) {
      changeSlide(activeIndex + 1);
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  return (
    <div
      className="bg-opacity-95 fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4"
      onClick={onClose}
    >
      <div
        className="relative mx-auto w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 flex items-center justify-between px-6">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70"
            onClick={onClose}
          >
            <FaWindowClose size={20} />
          </button>

          <div className="w-12"></div>
        </div>

        <div
          className="relative flex h-[680px] w-full cursor-grab items-center justify-center overflow-hidden select-none active:cursor-grabbing"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={(e) =>
            isDragging && handleDragMove(e.touches[0].clientX)
          }
          onTouchEnd={handleDragEnd}
        >
          {activeIndex > 0 && (
            <div
              className="absolute left-24 h-[700px] w-72 cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: "scale(0.85) rotateY(15deg)",
                transformStyle: "preserve-3d",
                opacity: 0.7,
                zIndex: 1,
              }}
              onClick={() => changeSlide(activeIndex - 1)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-xl">
                <div className="relative h-3/5 overflow-hidden">
                  <img
                    src={sortedEntries[activeIndex - 1].imgUrl}
                    alt="Previous journal entry"
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="flex h-2/5 flex-col justify-center p-4">
                  <div className="line-clamp-4 text-center text-sm text-gray-600">
                    {sortedEntries[activeIndex - 1].description}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="relative z-10 h-[660px] w-96 transition-all duration-500 ease-out"
            style={{
              transform: isDragging
                ? `translateX(${(currentX - startX) * 0.1}px)`
                : "scale(1)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="relative h-3/5 overflow-hidden">
                <img
                  src={sortedEntries[activeIndex].imgUrl}
                  alt="Current journal entry"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {formatDateForDisplay(sortedEntries[activeIndex].date)}
                </div>
              </div>

              <div className="flex h-2/5 flex-col items-center justify-center p-2">
                <div className="mb-4 flex items-center justify-center space-x-3">
                  <StarRating rating={sortedEntries[activeIndex].rating} />
                  <span className="text-lg font-semibold text-gray-800">
                    {sortedEntries[activeIndex].rating}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  {sortedEntries[activeIndex].categories
                    .slice(0, 3)
                    .map((category, categoryIndex) => (
                      <span
                        key={categoryIndex}
                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600"
                      >
                        {category}
                      </span>
                    ))}
                  {sortedEntries[activeIndex].categories.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
                      +{sortedEntries[activeIndex].categories.length - 3}
                    </span>
                  )}
                </div>

                <div className="line-clamp-3 text-center text-sm leading-relaxed text-gray-600">
                  {sortedEntries[activeIndex].description}
                </div>
                <div>
                  <button className="mt-4 bg-indigo-500 px-5 py-1 text-center text-white">
                    View Full Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {activeIndex < sortedEntries.length - 1 && (
            <div
              className="absolute right-24 h-[700px] w-72 cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: "scale(0.85) rotateY(-15deg)",
                transformStyle: "preserve-3d",
                opacity: 0.7,
                zIndex: 1,
              }}
              onClick={() => changeSlide(activeIndex + 1)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white shadow-xl">
                <div className="relative h-3/5 overflow-hidden">
                  <img
                    src={sortedEntries[activeIndex + 1].imgUrl}
                    alt="Next journal entry"
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="flex h-2/5 flex-col justify-center p-4">
                  <div className="line-clamp-4 text-center text-sm text-gray-600">
                    {sortedEntries[activeIndex + 1].description}
                  </div>
                </div>
                <div>
                  <button className="bg-red-500">View Full Post</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <CarouselNavigation
          activeIndex={activeIndex}
          total={sortedEntries.length}
          onChange={changeSlide}
        />
      </div>
    </div>
  );
};

export default JournalCarousel;
