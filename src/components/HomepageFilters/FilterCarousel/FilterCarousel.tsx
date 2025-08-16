import { cn } from "@/lib/utils";
import FilterButton from '../FilterButton/FilterButton';
import "../../../index.css"

/**
 * Componente riutilizzabile per un carosello di pulsanti di filtro.
 *
 * Visualizza una lista di pulsanti di filtro in un'unica riga orizzontale,
 * che può scorrere se lo spazio non è sufficiente. Gestisce lo stato attivo
 * dei pulsanti e fornisce un callback per notificare i cambiamenti di selezione.
 */
interface FilterCarouselProps {
  filters: {
    id: string;
    iconName: string;
    label: string;
  }[];
  activeFilterId: string | null; 
  onFilterChange: (id: string) => void; 
  className?: string; 
}

const FilterCarousel = ({
  filters,
  activeFilterId,
  onFilterChange,
  className
}: FilterCarouselProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto py-2 px-4 no-scrollbar", 
        className
      )}
    >
      <div className="flex gap-3"> 
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            iconName={filter.iconName}
            label={filter.label}
            isActive={filter.id === activeFilterId}
            onClick={() => onFilterChange(filter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCarousel;