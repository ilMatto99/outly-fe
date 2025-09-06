import Footer from "@/components/Footer/Footer";
import SearchBar from "@/components/SearchBar/SeachBar"
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { toLocalDateTimeString } from "@/utils/dateUtils";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { useLocation, useNavigate } from "react-router"

/**
 * Componente di pagina per la ricerca di attività.
 * * Permette agli utenti di inserire un termine di ricerca e un intervallo di date.
 * Recupera i filtri salvati dalla navigazione precedente e gestisce il loro aggiornamento.
 */
export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

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


    useEffect(() => {
        // Aggiorna lo stato dei filtri quando la location.state cambia
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
        // Naviga alla pagina dei risultati passando i filtri aggiornati
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
        // Naviga alla pagina dei filtri passando i filtri aggiornati
        navigate("/filters", { state: { filters: updatedFilters } });
    };

    const handleDateRangeChange = (range?: DateRange) => {
        setCurrentDateRange({ from: range?.from, to: range?.to });
    };

    // Funzione per visualizzare la data, accetta Date o stringa ISO
    const displayDate = (dateInput?: Date | string) => {
        if (!dateInput) return "Non specificata";
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        return format(date, "dd/MM/yyyy");
    };

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
                        initialDateRange={{
                            from: savedFilters.dataInizio ? new Date(savedFilters.dataInizio) : undefined,
                            to: savedFilters.dataFine ? new Date(savedFilters.dataFine) : undefined
                        }}
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
                        {savedFilters.km && <li>Distanza Attività (Km): {savedFilters.km}</li>}
                    </ul>
                </div>
            </div>

            {/* Footer fisso placeholder */}
            <Footer />
        </>
    )
}