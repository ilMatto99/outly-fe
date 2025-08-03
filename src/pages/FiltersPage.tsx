import { sportsData } from "@/api/sports";
import Button from "@/components/Button/button";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup/radio-group";
import { useFiltersData } from "@/hooks/useFiltersData";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router"

export const FiltersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialFilters: Partial<FiltroAttivitaDTO> = location.state?.filters || {};

  const [selectedSport, setSelectedSport] = useState<number | undefined>(initialFilters.sport);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | undefined>(initialFilters.difficolta);
  const [distanceKm, setDistanceKm] = useState<number | undefined>(initialFilters.rangeKm);
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(initialFilters.km);

  const { difficulties, levels, loading, error } = useFiltersData();

  const handleApplyFilters = () => {
    const filtersToApply: Partial<FiltroAttivitaDTO> = {
      ...initialFilters,
      sport: selectedSport,
      difficolta: selectedDifficulty,
      rangeKm: distanceKm,
      km: selectedLevel,
    }
    navigate("/search", {
      state: {
        filters: filtersToApply
      }
    })
  }

  const handleClearFilters = () => {
    setSelectedSport(undefined);
    setSelectedDifficulty(undefined);
    setDistanceKm(undefined);
    setSelectedLevel(undefined);
  };

  if (loading) return <div>Caricamento filtri...</div>;
  if (error) return <div>Errore nel caricamento dei filtri: {error}</div>;

  return (
    <>
      {/* Navbar fissa placeholder */}
      <div className="w-full h-[74px] bg-gray-200 text-center flex items-center justify-center text-sm text-gray-600 fixed top-0 left-0 z-50">
        Navbar Placeholder
      </div>

      {/* <div className="p-4"> */} <div className="flex-1 pt-[74px] pb-[101px] overflow-y-auto p-4 mt-5">
        <h1 className="text-2xl font-bold mb-4">Filtra Attività</h1>

        {/* Filtro per Sport */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Tipo di Attività (Sport)</h2>
          <RadioGroup
            value={selectedSport !== undefined ? selectedSport.toString() : ""}
            onValueChange={(value) => setSelectedSport(Number(value))}
          >
            {/* Mappa i dati e restituisce i RadioGroupItem come figli */}
            {sportsData.map((sport) => (
              <RadioGroupItem
                key={sport.id}
                value={sport.id.toString()}
                label={sport.nome}
              />
            ))}
          </RadioGroup>
        </div>

        {/* Filtro per Distanza */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Distanza in km</h2>
          {/* Placeholder per lo Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={distanceKm || 0}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
          />
          <span>{distanceKm || 0} km</span>
        </div>

        {/* Filtro per Difficoltà */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Difficoltà</h2>
          <RadioGroup
            value={selectedDifficulty !== undefined ? selectedDifficulty?.toString() : ""}
            onValueChange={(value) => setSelectedDifficulty(Number(value))}
          >
            {difficulties.map((diff) => (
              <RadioGroupItem
                key={diff.id}
                value={diff.id.toString()}
                label={diff.nome.charAt(0).toUpperCase() + diff.nome.slice(1)}
              />
            ))}
          </RadioGroup>
        </div>

        {/* Filtro per Livello  */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Livello Utente</h2>
          <RadioGroup
            value={selectedLevel !== undefined ? selectedLevel?.toString() : ""}
            onValueChange={(value) => setSelectedLevel(Number(value))}
          >
            {levels.map((level) => (
              <RadioGroupItem
                key={level.id}
                value={level.id.toString()}
                label={level.nome.charAt(0).toUpperCase() + level.nome.slice(1)}
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Footer fisso placeholder */}
        <div className="fixed bottom-0 p-4 w-full h-[101px] bg-white flex justify-end gap-4 items-center text-sm text-gray-700 shadow-2xl shadow-black">
          <Button variant="outline" onClick={handleClearFilters} label="Pulisci Filtri" />
          <Button onClick={handleApplyFilters} label="Applica Filtri" />
        </div>
    </>
  )

}