import { FaWindowClose } from "react-icons/fa";
import CarouselNavigation from "./CarouselNavigation";
import CarouselContainer from "./CarouselContainer";
import { useCarouselLogic } from "../hooks/useCarouselLogic";

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

  if (!isOpen || !journalData || journalData.length === 0) return null;

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
