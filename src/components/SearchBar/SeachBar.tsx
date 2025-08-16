import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useSearchState from "@/hooks/useSearchState"
import { type ChangeEvent } from "react"
import type { DateRange } from "react-day-picker"
import "../../index.css"
import Button from "../Button/button"
import Input from "../Input/input"

export interface SearchBarProps {
    onFilterClick?: () => void;
    onSearch?: (searchTerm: string, dateRange?: DateRange) => void;
    //Prop per i filtri selezionati dalla pagina filtri
    initialSearchTerm?: string;
    initialDateRange?: DateRange;
    onSearchTermChange?: (term: string) => void;
    onDateRangeChange?: (range: DateRange | undefined) => void;
}

/**
 * Componente riutilizzabile per una barra di ricerca.
 *
 * Combina un campo di input con icone per la ricerca, l'apertura di un calendario
 * per la selezione dell'intervallo di date e un pulsante per i filtri aggiuntivi.
 * Utilizza un hook personalizzato (`useSearchState`) per gestire lo stato interno.
 */
export function SearchBar({
    onDateRangeChange,
    onSearchTermChange,
    onFilterClick,
    onSearch,
    initialSearchTerm = "",
    initialDateRange,
}: SearchBarProps) {
    const {
        searchTerm,
        setSearchTerm,
        date,
        setDate,
        tempDate,
        setTempDate,
        calendarOpen,
        setCalendarOpen
    } = useSearchState(initialSearchTerm, initialDateRange);

    const handleConfirmDate = () => {
        setDate(tempDate);
        setCalendarOpen(false);
        onDateRangeChange?.(tempDate);
    };

    const handleClearDate = () => {
        setTempDate(undefined);
        setDate(undefined);
    };

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
        onSearchTermChange?.(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch?.(searchTerm, date);
    };

    return (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <Input
                label=""
                className=""
                type="search"
                placeholder={"Cerca un luogo di partenza"}
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyDown={e => e.key === "Enter" && handleSearchSubmit()}

                leadingIcon="search"
                onLeadingIconClick={handleSearchSubmit}

                trailingIcons={[
                    { iconName: "calendar", label: "Calendario", onClick: () => setCalendarOpen(true) },
                    { iconName: "filter", label: "Filtri", onClick: onFilterClick }
                ]}
            />
            <PopoverTrigger asChild><div /></PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={tempDate}
                    onSelect={setTempDate}
                    numberOfMonths={1}
                />
                <div className="p-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={handleClearDate} label="Pulisci"></Button>
                    <Button onClick={handleConfirmDate} label="Conferma"></Button>
                </div>
            </PopoverContent>
        </Popover >
    )
}

export default SearchBar;