import IconButton from "@/components/IconButton/IconButton";
import type { Difficolta } from "@/types/Difficolta";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import type { Sport } from "@/types/Sport"; // o come si chiama il tuo DTO per sport
import { format } from "date-fns";

interface ActiveFiltersProps {
    filters: Partial<FiltroAttivitaDTO>;
    onRemove: (key: keyof FiltroAttivitaDTO) => void;
    sports: Sport[];
    difficulties: Difficolta[]
}

const ActiveFilters = ({ filters, onRemove, sports, difficulties }: ActiveFiltersProps) => {
    const displayDate = (dateInput?: string | Date | number) => {
        if (!dateInput) return "";
        const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
        return format(date, "dd/MM/yyyy");
    };

    return (
        <div className="flex flex-wrap gap-2 mt-1 px-4 justify-center">
            {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;

                let displayValue: string;

                switch (key) {
                    case "dataInizio":
                    case "dataFine":
                        displayValue = displayDate(value);
                        break;
                    case "sport": {
                        const sportName =
                            sports.find((s) => s.idSport === Number(value))?.nome || `Sport ID: ${value}`;
                        displayValue = sportName;
                        break;
                    }
                    case "difficolta": {
                        const diffName = difficulties?.find(d => d.id === Number(value))?.nome
                            || `Diff ID: ${value}`;
                        displayValue = diffName.charAt(0).toUpperCase() + diffName.slice(1);
                        break;
                    }
                    case "rangeKm":
                        displayValue = `${value} km raggio`;
                        break;
                    case "km":
                        displayValue = `${value} km`;
                        break;
                    default:
                        displayValue = value.toString();
                }

                return (
                    <div
                        key={key}
                        className="flex items-center gap-1 bg-white text-[#203D41] border-2 border-[#203D41] rounded-full px-2 py-0.5 text-sm max-w-max"
                    >
                        <span>{displayValue}</span>
                        <IconButton
                            iconName="x"
                            label={`Rimuovi filtro ${key}`}
                            size="small"
                            onClick={() => onRemove(key as keyof FiltroAttivitaDTO)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ActiveFilters;
