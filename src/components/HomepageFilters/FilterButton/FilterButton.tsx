import { cn } from "@/lib/utils";
import Icon from '../../Icon/Icon';
import "../../../index.css"

/**
 * Componente riutilizzabile per un pulsante di filtro.
 *
 * Utilizzato per la barra dei filtri della homepage. Consiste in un'icona e
 * un'etichetta. Supporta due stati visivi: attivo e non attivo, con stili
 * distinti per indicare lo stato selezionato.
 */
interface FilterButtonProps {
  iconName: string; 
  label: string; 
  isActive?: boolean; 
  onClick?: (label: string) => void; 
  className?: string; 
}

const FilterButton =  ({
  iconName,
  label,
  isActive = false,
  onClick,
  className
}: FilterButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(label);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap",
        "transition-all duration-200 ease-in-out",
        isActive
          ? "bg-white border-2 border-[#203D41] text-[#203D41] shadow-sm" 
          : "bg-gray-100 border-gray-100 border-2 text-[#203D41] hover:bg-white hover:border-[#203D41] hover:border-2  ", 
        className
      )}
    >
      <Icon name={iconName} size={18} /> 
      <span>{label}</span>
    </button>
  );
};

export default FilterButton;