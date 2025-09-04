import { useDragHandlers } from "../hooks/useDragHandlers";
import JournalCard from "./JournalCard";

const CarouselContainer = ({
  containerRef,
  sortedEntries,
  activeIndex,
  isDragging,
  startX,
  currentX,
  changeSlide,
  handleMouseDown,
  handleTouchStart,
  handleDragMove,
  handleDragEnd,
}) => {
  const { getMouseHandlers, getTouchHandlers } = useDragHandlers(
    isDragging,
    handleDragMove,
    handleDragEnd,
  );

  return (
    <div
      className="relative flex h-[680px] w-full cursor-grab items-center justify-center overflow-hidden select-none active:cursor-grabbing"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      {...getMouseHandlers()}
      onTouchStart={handleTouchStart}
      {...getTouchHandlers()}
    >
      {activeIndex > 0 && (
        <JournalCard
          entry={sortedEntries[activeIndex - 1]}
          type="previous"
          onClick={() => changeSlide(activeIndex - 1)}
          className="absolute left-24 h-[700px] w-72 cursor-pointer transition-all duration-500 ease-out"
          style={{
            transform: "scale(0.85) rotateY(15deg)",
            transformStyle: "preserve-3d",
            opacity: 0.7,
            zIndex: 1,
          }}
        />
      )}

      <JournalCard
        entry={sortedEntries[activeIndex]}
        type="main"
        className="relative z-10 h-[660px] w-96 transition-all duration-500 ease-out"
        style={{
          transform: isDragging
            ? `translateX(${(currentX - startX) * 0.1}px)`
            : "scale(1)",
        }}
      />

      {activeIndex < sortedEntries.length - 1 && (
        <JournalCard
          entry={sortedEntries[activeIndex + 1]}
          type="next"
          onClick={() => changeSlide(activeIndex + 1)}
          className="absolute right-24 h-[700px] w-72 cursor-pointer transition-all duration-500 ease-out"
          style={{
            transform: "scale(0.85) rotateY(-15deg)",
            transformStyle: "preserve-3d",
            opacity: 0.7,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default CarouselContainer;
