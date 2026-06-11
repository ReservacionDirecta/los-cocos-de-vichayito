"use client";

import { useState, useRef, useEffect } from "react";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

export default function CustomDatePicker({ label, selectedDate, onChange, minDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef(null);

  // Parse selectedDate if exists
  const parsedSelected = selectedDate ? new Date(selectedDate + "T00:00:00") : null;

  // Initialize view to selected date or minDate
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate + "T00:00:00"));
    } else if (minDate) {
      setCurrentDate(new Date(minDate + "T00:00:00"));
    }
  }, [selectedDate, minDate]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Previous month fill days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const prevMonthDays = Array.from(
    { length: firstDayIndex },
    (_, i) => daysInPrevMonth - firstDayIndex + 1 + i
  );

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Next month fill days (to complete a standard grid of 42 cells)
  const totalCells = 42;
  const nextMonthDays = Array.from(
    { length: totalCells - (prevMonthDays.length + currentMonthDays.length) },
    (_, i) => i + 1
  );

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectDay = (day, isCurrentMonth = true, isPrev = false) => {
    let targetMonth = month;
    let targetYear = year;

    if (!isCurrentMonth) {
      if (isPrev) {
        targetMonth = month === 0 ? 11 : month - 1;
        targetYear = month === 0 ? year - 1 : year;
      } else {
        targetMonth = month === 11 ? 0 : month + 1;
        targetYear = month === 11 ? year + 1 : year;
      }
    }

    const formattedMonth = String(targetMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateStr = `${targetYear}-${formattedMonth}-${formattedDay}`;

    // Validate minDate constraint
    if (minDate && new Date(dateStr + "T00:00:00") < new Date(minDate + "T00:00:00")) {
      return;
    }

    onChange(dateStr);
    setIsOpen(false);
  };

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return "Seleccione fecha";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const isSelected = (day, isCurrentMonth = true, isPrev = false) => {
    if (!parsedSelected) return false;
    let targetMonth = month;
    let targetYear = year;

    if (!isCurrentMonth) {
      if (isPrev) {
        targetMonth = month === 0 ? 11 : month - 1;
        targetYear = month === 0 ? year - 1 : year;
      } else {
        targetMonth = month === 11 ? 0 : month + 1;
        targetYear = month === 11 ? year + 1 : year;
      }
    }

    return (
      parsedSelected.getDate() === day &&
      parsedSelected.getMonth() === targetMonth &&
      parsedSelected.getFullYear() === targetYear
    );
  };

  const isDisabled = (day, isCurrentMonth = true, isPrev = false) => {
    if (!minDate) return false;
    let targetMonth = month;
    let targetYear = year;

    if (!isCurrentMonth) {
      if (isPrev) {
        targetMonth = month === 0 ? 11 : month - 1;
        targetYear = month === 0 ? year - 1 : year;
      } else {
        targetMonth = month === 11 ? 0 : month + 1;
        targetYear = month === 11 ? year + 1 : year;
      }
    }

    const targetDate = new Date(targetYear, targetMonth, day);
    const limitDate = new Date(minDate + "T00:00:00");
    // Normalize to compare year/month/day
    targetDate.setHours(0,0,0,0);
    limitDate.setHours(0,0,0,0);

    return targetDate < limitDate;
  };

  return (
    <div className="relative flex flex-col gap-2 w-full" ref={containerRef}>
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </span>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 px-4 rounded-xl border flex items-center justify-between text-left text-sm font-medium transition-all duration-300 ${
          isOpen
            ? "border-emerald-700 ring-2 ring-emerald-700/20 bg-white shadow-md"
            : "border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-stone-400"
        } text-stone-700`}
      >
        <span className={selectedDate ? "text-stone-800" : "text-stone-400"}>
          {formatDateLabel(selectedDate)}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-800" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <div className="absolute top-[78px] left-0 z-50 w-[300px] bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xl shadow-stone-900/10 transition-all duration-200 ease-out origin-top scale-100 opacity-100 animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
              aria-label="Mes Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <span className="text-sm font-semibold text-stone-800">
              {MONTH_NAMES[month]} {year}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
              aria-label="Mes Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-stone-400 mb-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 text-center text-xs">
            {/* Prev month days */}
            {prevMonthDays.map((day) => {
              const disabled = isDisabled(day, false, true);
              const selected = isSelected(day, false, true);
              return (
                <button
                  key={`prev-${day}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day, false, true)}
                  className={`py-2 rounded-lg text-stone-300 transition-all ${
                    disabled
                      ? "opacity-30 cursor-not-allowed"
                      : selected
                      ? "bg-emerald-800 text-white font-bold"
                      : "hover:bg-stone-100 hover:text-stone-500"
                  }`}
                >
                  {day}
                </button>
              );
            })}

            {/* Current month days */}
            {currentMonthDays.map((day) => {
              const disabled = isDisabled(day, true);
              const selected = isSelected(day, true);
              return (
                <button
                  key={`curr-${day}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day, true)}
                  className={`py-2 rounded-lg font-medium transition-all ${
                    disabled
                      ? "text-stone-200 cursor-not-allowed"
                      : selected
                      ? "bg-emerald-800 text-white font-bold scale-105 shadow-md shadow-emerald-800/20"
                      : "text-stone-700 hover:bg-stone-100 hover:text-emerald-800"
                  }`}
                >
                  {day}
                </button>
              );
            })}

            {/* Next month days */}
            {nextMonthDays.map((day) => {
              const disabled = isDisabled(day, false, false);
              const selected = isSelected(day, false, false);
              return (
                <button
                  key={`next-${day}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day, false, false)}
                  className={`py-2 rounded-lg text-stone-300 transition-all ${
                    disabled
                      ? "opacity-30 cursor-not-allowed"
                      : selected
                      ? "bg-emerald-800 text-white font-bold"
                      : "hover:bg-stone-100 hover:text-stone-500"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
