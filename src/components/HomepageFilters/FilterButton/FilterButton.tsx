import Icon from '../../Icon/Icon';
import './../../../index.css'

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

const FilterButton = ({
  iconName,
  label,
  isActive = false,
  onClick,
  className
}: FilterButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick(label);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`d-flex align-items-center gap-2 rounded-pill px-4 py-2 fw-semibold text-nowrap transition-all ${
        isActive
          ? "bg-white border-2 border-custom text-custom shadow-sm"
          : "bg-light border-2 border-light text-custom hover-bg-white hover-border-custom"
      } ${className || ""}`}
    >
      <Icon name={iconName} size={18} />
      <span>{label}</span>
    </button>
  );
};

export default FilterButton;
