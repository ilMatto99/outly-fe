import ActiveFilters from "@/components/ActiveFilters";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/SearchBar/SeachBar";
import { useFiltersData } from "@/hooks/useFiltersData";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { toLocalDateTimeString } from "@/utils/dateUtils";
//import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useLocation, useNavigate } from "react-router";

/**
 * Componente di pagina per la ricerca di attività.
 * * Permette agli utenti di inserire un termine di ricerca e un intervallo di date.
 * Recupera i filtri salvati dalla navigazione precedente e gestisce il loro aggiornamento.
 */
export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { sports, difficulties, loading: filtersLoading, error: filtersError } = useFiltersData();

    // Recupera i filtri passati dalla pagina precedente
    const initialFilters: Partial<FiltroAttivitaDTO> = location.state?.filters || {};

    // Converte le stringhe data in oggetti Date per inizializzare il DatePicker
    const initialDateRangeFrom = initialFilters.dataInizio ? new Date(initialFilters.dataInizio) : undefined;
    const initialDateRangeTo = initialFilters.dataFine ? new Date(initialFilters.dataFine) : undefined;

    const [savedFilters, setSavedFilters] = useState<Partial<FiltroAttivitaDTO>>(initialFilters);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(savedFilters.luogo || "");
    const [currentDateRange, setCurrentDateRange] = useState<{ from?: Date; to?: Date }>({
        from: initialDateRangeFrom,
        to: initialDateRangeTo,
    });


    // Aggiorna savedFilters se la location cambia
    useEffect(() => {
        if (location.state?.filters) {
            const filtersFromState: Partial<FiltroAttivitaDTO> = location.state.filters;
            setSavedFilters(filtersFromState);
            setCurrentSearchTerm(filtersFromState.luogo || "");
            setCurrentDateRange({
                from: filtersFromState.dataInizio ? new Date(filtersFromState.dataInizio) : undefined,
                to: filtersFromState.dataFine ? new Date(filtersFromState.dataFine) : undefined,
            });
        }
    }, [location.state]);

    // Aggiorna savedFilters e currentSearchTerm quando l'utente scrive
    const handleSearchTermChange = (term: string) => {
        setCurrentSearchTerm(term);
        setSavedFilters(prev => ({
            ...prev,
            luogo: term || undefined
        }));
    };

    // Aggiorna savedFilters e currentDateRange quando l'utente seleziona le date
    const handleDateRangeChange = (range?: DateRange) => {
        const fromStr = range?.from ? toLocalDateTimeString(range.from) : undefined;
        const toStr = range?.to ? toLocalDateTimeString(range.to) : undefined;

        setCurrentDateRange({ from: range?.from, to: range?.to });
        setSavedFilters(prev => ({
            ...prev,
            dataInizio: fromStr,
            dataFine: toStr
        }));
    };

    /**
     * Gestisce la ricerca principale.
     * - Aggiorna lo stato dei filtri con il termine di ricerca e l'intervallo di date.
     * - Naviga alla pagina dei risultati (`/results`) passando i filtri aggiornati nello stato della location.
     * @param term Il termine di ricerca inserito dall'utente.
     * @param dateRange L'intervallo di date selezionato.
     */
    const handleSearch = (term: string, dateRange?: { from?: Date; to?: Date }) => {
        const newFilters: Partial<FiltroAttivitaDTO> = {
            ...savedFilters,
            luogo: term,
            dataInizio: dateRange?.from ? toLocalDateTimeString(dateRange.from) : undefined,
            dataFine: dateRange?.to ? toLocalDateTimeString(dateRange.to) : undefined
        };
        setSavedFilters(newFilters);
        navigate("/results", { state: { filters: newFilters } });
    };

    /**
     * Gestisce il click sul pulsante dei filtri.
     * - Aggiorna lo stato dei filtri con il termine di ricerca e l'intervallo di date correnti.
     * - Naviga alla pagina dei filtri (`/filters`) passando i filtri attuali nello stato della location.
     */
    const handleFilterClick = () => {
        const updatedFilters = {
            ...savedFilters,
            luogo: currentSearchTerm,
            dataInizio: currentDateRange.from ? toLocalDateTimeString(currentDateRange.from) : undefined,
            dataFine: currentDateRange.to ? toLocalDateTimeString(currentDateRange.to) : undefined
        };
        setSavedFilters(updatedFilters);
        navigate("/filters", { state: { filters: updatedFilters } });
    };

    const handleRemoveFilter = (key: keyof FiltroAttivitaDTO) => {
        const newFilters = { ...savedFilters, [key]: undefined };
        setSavedFilters(newFilters);
        navigate("/search", { state: { filters: newFilters } });
    };

    return (
        <>
            <Navbar variant="primary" />

            <div className="flex-1 pt-[74px]">
                {/* Barra di ricerca */}
                <div className="bg-white px-2 py-2 mt-4 sticky top-[74px] flex justify-center">
                    <SearchBar
                        initialSearchTerm={savedFilters.luogo || ""}
                        initialDateRange={{
                            from: savedFilters.dataInizio ? new Date(savedFilters.dataInizio) : undefined,
                            to: savedFilters.dataFine ? new Date(savedFilters.dataFine) : undefined
                        }}
                        onSearch={handleSearch}
                        onFilterClick={handleFilterClick}
                        onSearchTermChange={handleSearchTermChange}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </div>

                {/* Filtri attivi */}
                <div className="flex justify-center mt-0">
                    {filtersLoading ? (
                        <div className="text-sm text-gray-500">Caricamento sport...</div>
                    ) : filtersError ? (
                        <div className="text-sm text-red-600">Errore nel caricamento degli sport</div>
                    ) : (
                        <ActiveFilters
                            filters={savedFilters}
                            onRemove={handleRemoveFilter}
                            sports={sports}
                            difficulties={difficulties}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}