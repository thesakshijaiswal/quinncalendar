import { useState, useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (months, setMonths) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const scrollContainerRef = useRef(null);
  const monthRefs = useRef({});
  const isScrollingRef = useRef(false);
  const initialScrollDone = useRef(false);

  const getAdjacentMonth = (year, month, offset) => {
    const newDate = new Date(year, month + offset, 1);
    return {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      key: `${newDate.getFullYear()}-${newDate.getMonth()}`,
    };
  };

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !initialScrollDone.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const zoomFactor = window.devicePixelRatio || 1;
    const scrollThreshold = 100 * zoomFactor;

    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollBottom = scrollTop + containerHeight;
    const containerMiddle = scrollTop + containerHeight / 2;

    let closestMonth = null;
    let minDistance = Infinity;

    months.forEach((monthData) => {
      const monthElement = monthRefs.current[monthData.key];
      if (!monthElement) return;

      const elementTop = monthElement.offsetTop;
      const elementBottom = elementTop + monthElement.offsetHeight;
      const elementMiddle = elementTop + monthElement.offsetHeight / 2;

      const distance = Math.abs(containerMiddle - elementMiddle);
      const isVisible = elementBottom > scrollTop && elementTop < scrollBottom;

      if (isVisible && distance < minDistance) {
        minDistance = distance;
        closestMonth = monthData;
      }
    });

    if (
      closestMonth &&
      (closestMonth.month !== currentMonth || closestMonth.year !== currentYear)
    ) {
      setCurrentMonth(closestMonth.month);
      setCurrentYear(closestMonth.year);
    }

    if (scrollTop < scrollThreshold) {
      const first = months[0];
      const prevMonth = getAdjacentMonth(first.year, first.month, -1);
      setMonths((prev) => [prevMonth, ...prev]);
      requestAnimationFrame(() => {
        const addedEl = monthRefs.current[prevMonth.key];
        if (addedEl) container.scrollTop = addedEl.offsetHeight + scrollTop;
      });
    }

    if (scrollBottom >= container.scrollHeight - scrollThreshold - 1) {
      const last = months[months.length - 1];
      const nextMonth = getAdjacentMonth(last.year, last.month, 1);
      setMonths((prev) => [...prev, nextMonth]);
    }
  }, [months, currentMonth, currentYear, setMonths]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || initialScrollDone.current) return;

    const currentKey = `${new Date().getFullYear()}-${new Date().getMonth()}`;
    const checkAndScroll = () => {
      const currentMonthElement = monthRefs.current[currentKey];
      if (currentMonthElement) {
        isScrollingRef.current = true;
        currentMonthElement.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
        setTimeout(() => {
          isScrollingRef.current = false;
          initialScrollDone.current = true;
        }, 150);
      } else {
        setTimeout(checkAndScroll, 100);
      }
    };

    setTimeout(checkAndScroll, 50);
  }, [months]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", scrollHandler, { passive: true });
    return () => container.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  return {
    currentMonth,
    currentYear,
    scrollContainerRef,
    monthRefs,
    isScrolling: isScrollingRef.current,
  };
};

export default useInfiniteScroll;
