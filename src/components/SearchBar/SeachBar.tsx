import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, type ChangeEvent } from "react"
import type { DateRange } from "react-day-picker"
import Button from "../Button/button"
import Input from "../Input/input"
import "../../index.css"

export interface SearchBarProps {
    onFilterClick?: () => void;
    onSearch?: (searchTerm: string, dateRange?: DateRange) => void;
}

export function SearchBar({ onFilterClick, onSearch }: SearchBarProps) {
    const [date, setDate] = useState<DateRange | undefined>();
    const [tempDate, setTempDate] = useState<DateRange | undefined>();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleConfirmDate = () => {
        setDate(tempDate)
        setCalendarOpen(false)
        if (onSearch) {
            onSearch(searchTerm, tempDate)
        }
    }

    const handleClearDate = () => {
        setTempDate(undefined)
        setDate(undefined)
        if (onSearch) {
            onSearch(searchTerm, undefined)
        }
    }

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value)
        if (onSearch) {
            onSearch(e.target.value, date)
        }
    }

    /* const displayDateRange = date?.from ?
        date.to ?
            `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
            : format(date.from, "dd/MM/yyyy")
        : "" */

    return (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
                <Input
                    label=""
                    className=""
                    type="search"
                    placeholder={
                        "Cerca un'attività"
                    }
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    leadingIcon="search"
                    trailingIcons={[
                        { iconName: 'calendar', label: 'Calendario', onClick: () => setCalendarOpen(true) },
                        { iconName: 'filter', label: 'Filtri', onClick: onFilterClick }
                    ]}
                />
            </PopoverTrigger>
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
        </Popover>
    )
}

export default SearchBar;