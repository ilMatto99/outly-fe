import SearchBar from "@/components/SearchBar/SeachBar"
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { format } from "date-fns";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { useLocation, useNavigate } from "react-router"

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Recupera i filtri passati dalla pagina precedente
    const initialFilters: Partial<FiltroAttivitaDTO> = location.state?.filters || {};

    const [savedFilters, setSavedFilters] = useState<Partial<FiltroAttivitaDTO>>(initialFilters);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(savedFilters.luogo || "");
    const [currentDateRange, setCurrentDateRange] = useState<{ from?: Date; to?: Date }>({
        from: savedFilters.dataInizio,
        to: savedFilters.dataFine,
    });


    useEffect(() => {
        // Aggiorna lo stato dei filtri quando la location.state cambia
        if (location.state?.filters) {
            setSavedFilters(location.state.filters);
        }
    }, [location.state]);

    const handleSearch = (term: string, dateRange?: { from?: Date; to?: Date }) => {
        const newFilters: Partial<FiltroAttivitaDTO> = {
            ...savedFilters,
            luogo: term,
            dataInizio: dateRange?.from,
            dataFine: dateRange?.to
        };
        setSavedFilters(newFilters);
        navigate("/results", { state: { filters: newFilters } });
    };

    const handleFilterClick = () => {
        const updatedFilters = {
            ...savedFilters,
            luogo: currentSearchTerm,
            dataInizio: currentDateRange.from,
            dataFine: currentDateRange.to
        };
        setSavedFilters(updatedFilters);
        navigate("/filters", { state: { filters: updatedFilters } });
    };

    const handleDateRangeChange = (range?: DateRange) => {
        setCurrentDateRange({ from: range?.from, to: range?.to });
    };

    const displayDate = (date?: Date) => date ? format(date, "dd/MM/yyyy") : "Non specificata";

    return (
        <>
            {/* Navbar fissa placeholder */}
            <div className="w-full h-[74px] fixed top-0 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                Navbar Placeholder
            </div>
            <div className="flex-1 pt-[74px] ">
                <div className="bg-white px-4 py-6 sticky top-[74px] flex justify-center">
                    <SearchBar
                        initialSearchTerm={savedFilters.luogo || ""}
                        initialDateRange={{ from: savedFilters.dataInizio, to: savedFilters.dataFine }}
                        onSearch={handleSearch}
                        onFilterClick={handleFilterClick}
                        onSearchTermChange={setCurrentSearchTerm}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-bold">Filtri Selezionati</h2>
                    <ul className="list-disc list-inside p-4 bg-gray-100 rounded-md">
                        {savedFilters.luogo && <li>Luogo: {savedFilters.luogo}</li>}
                        {savedFilters.dataInizio && <li>Data Inizio: {displayDate(savedFilters.dataInizio)}</li>}
                        {savedFilters.dataFine && <li>Data Fine: {displayDate(savedFilters.dataFine)}</li>}
                        {savedFilters.sport && <li>Sport (ID): {savedFilters.sport}</li>}
                        {savedFilters.difficolta && <li>Difficoltà (ID): {savedFilters.difficolta}</li>}
                        {savedFilters.rangeKm && <li>Raggio (Km): {savedFilters.rangeKm}</li>}
                        {savedFilters.km && <li>Livello Attività (ID): {savedFilters.km}</li>}
                    </ul>
                </div>
            </div>

            {/* Footer fisso placeholder */}
            <div className="fixed bottom-0 w-full h-[101px] bg-gray-300 flex items-center justify-center text-sm text-gray-700">
                Footer Placeholder
            </div>
        </>
    )
}