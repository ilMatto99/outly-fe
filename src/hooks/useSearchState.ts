import { useState, useCallback, useEffect } from "react";
import type { DateRange } from "react-day-picker";

export default function useSearchState(
  initialTerm = "",
  initialDateRange?: DateRange
) {
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [tempDate, setTempDate] = useState<DateRange | undefined>(initialDateRange);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Sync iniziale (in caso le prop cambino)
  useEffect(() => {
    setSearchTerm(initialTerm);
  }, [initialTerm]);

  useEffect(() => {
    setDate(initialDateRange);
    setTempDate(initialDateRange);
  }, [initialDateRange]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setDate(undefined);
    setTempDate(undefined);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    date,
    setDate,
    tempDate,
    setTempDate,
    calendarOpen,
    setCalendarOpen,
    clearSearch,
  };
}
