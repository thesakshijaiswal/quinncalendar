import { parse, format, startOfMonth, endOfMonth, getDay } from "date-fns";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const parseJournalEntries = (journalData) => {
  const journalEntries = {};

  journalData.forEach((entry) => {
    const parsedDate = parse(entry.date, "dd/MM/yyyy", new Date());
    const dateKey = format(parsedDate, "yyyy-MM-dd");

    if (!journalEntries[dateKey]) {
      journalEntries[dateKey] = [];
    }
    journalEntries[dateKey].push(entry);
  });

  return journalEntries;
};

export const generateCalendarDays = (year, month, journalEntries = {}) => {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(firstDay);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = getDay(firstDay);

  const days = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    const dateKey = format(dateObj, "yyyy-MM-dd");
    days.push({
      day,
      dateKey,
      hasEntry: !!journalEntries[dateKey],
    });
  }

  return days;
};
