import React, { useState } from "react";

interface CalendarProps {
  month: number;
  year: number;
  darkMode?: boolean;
  setSelectedDay: (day: number) => void; // <- notify Timeline
}

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const Calendar: React.FC<CalendarProps> = ({ month, year, darkMode, setSelectedDay }) => {
  const [selectedDayInternal, setSelectedDayInternal] = useState<number | null>(null);
  const totalDays = daysInMonth(month, year);
  const firstDay = new Date(year, month, 1).getDay();

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const currentDay = isCurrentMonth ? today.getDate() : null;

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return (
    <div className={`p-4 rounded-lg w-full shadow-md ${darkMode ? "bg-zinc-800/60 text-white" : "bg-white text-black"}`}>
      {/* Weekday header */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2 text-sm">
        {weeks.map((day) => <div key={day}>{day}</div>)}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, idx) => {
          const isToday = day === currentDay;
          const isSelected = day === selectedDayInternal;

          return (
            <div
              key={idx}
              onClick={() => {
                if (!day) return;
                setSelectedDayInternal(day);
                setSelectedDay(day)
                if (setSelectedDay) setSelectedDay(day); // notify Timeline
              }}
              className={`h-10 flex items-center justify-center rounded-lg transition-colors ${
                day
                  ? isSelected
                    ? "bg-[#F0E7D5]/70 text-black font-bold"
                    : isToday
                    ? darkMode
                      ? "bg-[#854F6C] text-white font-bold"
                      : "bg-[#854F6C] text-white font-bold"
                    : darkMode
                    ? "hover:bg-[#2d3a64] cursor-pointer"
                    : "hover:bg-gray-200 cursor-pointer"
                  : ""
              }`}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
