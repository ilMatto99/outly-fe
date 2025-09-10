import CardActivity from "@/components/CardActivity/CardActivity";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/SearchBar/SeachBar";
import { useActivities } from "@/hooks/useActivities";
import type { AttivitaDTO } from "@/types/AttivitaDTO";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router";

/**
 * Componente di pagina per visualizzare i risultati di ricerca delle attività.
 * - Recupera i filtri dallo stato di navigazione e li passa all'hook `useActivities`.
 * - Gestisce lo stato di caricamento e di errore della fetch.
 * - Renderizza una lista di `CardActivity` con i risultati ottenuti.
 */
export const SearchResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const filters = location.state?.filters;

    const { activities, loading, error } = useActivities(filters);

    /**
     * Naviga alla pagina di ricerca quando l'utente clicca sulla search bar.
     */
    const handleClick = () => {
        navigate("/search");
    };

     /**
     * Formatta una stringa di data in formato "gg/MM/aaaa".
     *
     * @param dateString La data da formattare.
     * @returns La data formattata o "Data non specificata" se la data non è valida.
     */
    const displayDate = (dateString?: string) => {
        return dateString ? format(new Date(dateString), "dd/MM/yyyy") : "Data non specificata";
    };

    return (
        <>
            <Navbar variant="primary" />
            <div className="flex-1 pt-[74px] ">
                <div className="bg-white px-4 py-6 sticky top-[74px] flex justify-center" onClick={handleClick}>
                    <SearchBar />
                </div>

                <div className="container mx-auto">
                    {loading && <p className="text-center text-lg text-gray-600">Caricamento attività...</p>}
                    {error && <p className="text-center text-lg text-red-500">Errore: {error}</p>}
                    {!loading && !error && activities.length === 0 && (
                        <p className="text-center text-lg text-gray-600">Nessuna attività trovata con i filtri selezionati.</p>
                    )}
                </div>

                {!loading && activities.length > 0 && (
                    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                        {activities.map((activity: AttivitaDTO, index: number) => (
                            <CardActivity
                                key={index}
                                title={activity.titolo}
                                location={activity.luogo}
                                date={displayDate(activity.dataAttivita)}
                                distance={`${activity.km} km`}
                                duration={`${activity.durata} min`}
                                difficulty={`Difficoltà: ${activity.difficolta}`}
                                mapImage={activity.mappaUrl}
                            />
                        ))}
                    </div>
                )}


            </div>
            
            <Footer /> 
        </>
    )
}