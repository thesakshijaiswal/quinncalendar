import { useState, useRef, useEffect } from "react";

export const useCarouselLogic = (isOpen, initialEntry, journalData) => {
  const getInitialIndex = () => {
    if (!initialEntry || !journalData) return 0;
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
    return index !== -1 ? index : 0;
  };

  const [activeIndex, setActiveIndex] = useState(() => getInitialIndex());
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);
  const sortedEntries = journalData
    ? [...journalData].sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
      })
    : [];

  useEffect(() => {
    if (isOpen && initialEntry && journalData) {
      const index = sortedEntries.findIndex(
        (entry) =>
          entry.date === initialEntry.date &&
          entry.description === initialEntry.description,
      );
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  }, [initialEntry, journalData, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setActiveIndex(0), 100);
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

  return {
    activeIndex,
    isDragging,
    startX,
    currentX,
    containerRef,
    sortedEntries,
    changeSlide,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleMouseDown,
    handleTouchStart,
  };
};
