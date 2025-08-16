import { useState, useCallback, useEffect } from "react";
import type { DateRange } from "react-day-picker";

/**
 * Hook personalizzato per gestire lo stato di ricerca.
 *
 * @param initialTerm Il termine di ricerca iniziale.
 * @param initialDateRange L'intervallo di date iniziale.
 * @returns Un oggetto contenente lo stato della ricerca (termine, date, stato del calendario) e le relative funzioni di aggiornamento.
 */
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
