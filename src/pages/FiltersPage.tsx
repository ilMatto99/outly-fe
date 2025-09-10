import Button from "@/components/Button/button";
import Navbar from "@/components/Navbar/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup/radio-group";
import { Slider } from "@/components/ui/slider";
import { useFiltersData } from "@/hooks/useFiltersData";
import type { FiltroAttivitaDTO } from "@/types/FiltroAttivitaDTO";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Componente di pagina per la gestione dei filtri di ricerca delle attività.
 * * Permette agli utenti di selezionare filtri come sport, difficoltà e distanza, e di applicarli per raffinare la ricerca. 
 * Lo stato dei filtri viene mantenuto e passato tra le pagine tramite la navigazione.
 */
export const FiltersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialFilters: Partial<FiltroAttivitaDTO> = location.state?.filters || {};

  const [selectedSport, setSelectedSport] = useState<number | undefined>(initialFilters.sport);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | undefined>(initialFilters.difficolta);
  const [distanceKm, setDistanceKm] = useState<number[]>(
    initialFilters.km ? [initialFilters.km] : [0]
  );

  const { difficulties, sports, loading, error } = useFiltersData();

  /**
     * Gestisce l'applicazione dei filtri e la navigazione alla pagina dei risultati.
     * - Crea un oggetto `FiltroAttivitaDTO` con i filtri selezionati.
     * - Naviga alla rotta `/search` passando l'oggetto filtri nello stato della location.
     */
  const handleApplyFilters = () => {
    const filtersToApply: Partial<FiltroAttivitaDTO> = {
      ...initialFilters,
      sport: selectedSport,
      difficolta: selectedDifficulty,
      km: distanceKm[0],
    }
    navigate("/search", {
      state: {
        filters: filtersToApply
      }
    })
  }

  /**
     * Resetta tutti i filtri selezionati ai valori predefiniti.
     */
  const handleClearFilters = () => {
    setSelectedSport(undefined);
    setSelectedDifficulty(undefined);
    setDistanceKm([0]);
  };

  if (loading) return <div>Caricamento filtri...</div>;
  if (error) return <div>Errore nel caricamento dei filtri: {error}</div>;

  return (
    <>
      <Navbar variant="secondary" />

      <div className="flex-1 pt-[74px] pb-[101px] overflow-y-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Filtra Attività</h1>

        {/* Filtro per Sport */}
        <div className="mb-4 ">
          <h2 className="text-lg font-semibold mb-2">Tipo di Attività (Sport)</h2>
          <RadioGroup
            value={selectedSport !== undefined ? selectedSport.toString() : ""}
            onValueChange={(value) => setSelectedSport(Number(value))}
          >
            {/* Mappa i dati e restituisce i RadioGroupItem come figli */}
            {sports.sort((a, b) => a.idSport - b.idSport).map((sport) => (
              <RadioGroupItem
                key={sport.idSport}
                value={sport.idSport.toString()}
                label={sport.nome}
              />
            ))}
          </RadioGroup>
        </div>

        {/* Filtro per Distanza */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Distanza in km</h2>
          <div className="flex items-center gap-3">
          <Slider
            className="w-40 custom-slider"
            min={0}
            max={100}
            step={1}
            value={distanceKm}
            onValueChange={(val: number[]) => setDistanceKm(val)}
          />
          

          <span>{distanceKm[0]} km</span>
          </div>
        </div>

        {/* Filtro per Difficoltà */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Difficoltà</h2>
          <RadioGroup
            value={selectedDifficulty !== undefined ? selectedDifficulty?.toString() : ""}
            onValueChange={(value) => setSelectedDifficulty(Number(value))}
          >
            {difficulties.sort((a, b) => a.id - b.id).map((diff) => (
              <RadioGroupItem
                key={diff.id}
                value={diff.id.toString()}
                label={diff.nome.charAt(0).toUpperCase() + diff.nome.slice(1)}
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="fixed bottom-0 p-4 w-full h-[101px] bg-white flex justify-end gap-4 items-center text-sm text-gray-700 shadow-2xl shadow-black">
        <Button variant="outline" onClick={handleClearFilters} label="Pulisci Filtri" />
        <Button onClick={handleApplyFilters} label="Applica Filtri" />
      </div>
    </>
  )

}