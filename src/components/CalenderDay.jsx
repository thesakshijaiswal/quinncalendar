const CalendarDay = ({ dayData }) => {
  if (!dayData) {
    return (
      <div className="relative flex aspect-square items-center justify-center border-r border-b border-gray-100 last:border-r-0" />
    );
  }

  return (
    <div className="relative flex aspect-square items-center justify-center border-r border-b border-gray-100 last:border-r-0">
      <span className="absolute top-2 left-2 text-sm text-gray-700 md:text-lg">
        {dayData.day}
      </span>
    </div>
  );
};

export default CalendarDay;
