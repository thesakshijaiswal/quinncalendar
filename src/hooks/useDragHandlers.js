export const useDragHandlers = (isDragging, handleDragMove, handleDragEnd) => {
  const getMouseHandlers = () => ({
    onMouseMove: (e) => isDragging && handleDragMove(e.clientX),
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
  });

  const getTouchHandlers = () => ({
    onTouchMove: (e) => isDragging && handleDragMove(e.touches[0].clientX),
    onTouchEnd: handleDragEnd,
  });

  return {
    getMouseHandlers,
    getTouchHandlers,
  };
};
