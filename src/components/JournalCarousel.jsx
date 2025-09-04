import { FaWindowClose } from "react-icons/fa";
import CarouselNavigation from "./CarouselNavigation";
import CarouselContainer from "./CarouselContainer";
import { useCarouselLogic } from "../hooks/useCarouselLogic";
import { useEffect } from "react";

const JournalCarousel = ({ isOpen, onClose, initialEntry, journalData }) => {
  const {
    activeIndex,
    isDragging,
    startX,
    currentX,
    containerRef,
    sortedEntries,
    changeSlide,
    handleDragMove,
    handleDragEnd,
    handleMouseDown,
    handleTouchStart,
  } = useCarouselLogic(isOpen, initialEntry, journalData);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !journalData || journalData.length === 0) return null;

  return (
    <div
      className="bg-opacity-95 fixed inset-0 z-50 overflow-auto overscroll-contain bg-black"
      onClick={onClose}
    >
      <div className="flex min-h-screen min-w-full flex-col items-center justify-center p-4">
        <div
          className="relative mx-auto flex min-h-fit w-full max-w-5xl flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between px-6">
            <button
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70"
              onClick={onClose}
            >
              <FaWindowClose size={20} />
            </button>
            <div className="w-12 shrink-0"></div>
          </div>

          <div className="min-h-0 flex-1">
            <CarouselContainer
              containerRef={containerRef}
              sortedEntries={sortedEntries}
              activeIndex={activeIndex}
              isDragging={isDragging}
              startX={startX}
              currentX={currentX}
              changeSlide={changeSlide}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
              handleDragMove={handleDragMove}
              handleDragEnd={handleDragEnd}
            />
          </div>
          <div className="mt-4">
            <CarouselNavigation
              activeIndex={activeIndex}
              total={sortedEntries.length}
              onChange={changeSlide}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalCarousel;
