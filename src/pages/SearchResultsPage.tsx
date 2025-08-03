import { format } from "date-fns";
import { useLocation } from "react-router";

export const SearchResultsPage = () => {
    const location = useLocation();
    const filters = location.state?.filters;

    const displayDate = (date?: Date) => date ? format(date, "dd/MM/yyyy") : "Non specificata";

    return (
        <>
            {/* Navbar fissa placeholder */}
            <div className="w-full h-[74px] bg-gray-200 text-center flex items-center justify-center text-sm text-gray-600 fixed top-0 left-0 z-50">
                Navbar Placeholder
            </div>
            <div className="mt-[80px] p-4">
                <h1 className="text-xl font-bold mb-2">Risultati cercati con i seguenti filtri:</h1>
                <ul className="list-disc list-inside p-4 bg-gray-100 rounded-md">
                    {filters?.luogo && <li>Luogo: {filters.luogo}</li>}
                    {filters?.dataInizio && <li>Data Inizio: {displayDate(filters.dataInizio)}</li>}
                    {filters?.dataFine && <li>Data Fine: {displayDate(filters.dataFine)}</li>}
                    {filters?.sport && <li>Sport (ID): {filters.sport}</li>}
                    {filters?.difficolta && <li>Difficoltà (ID): {filters.difficolta}</li>}
                    {filters?.rangeKm && <li>Raggio (Km): {filters.rangeKm}</li>}
                    {filters?.km && <li>Livello Attività (ID): {filters.km}</li>}
                </ul>
            </div>   
            {/* Footer fisso placeholder */}
            <div className="fixed bottom-0 w-full h-[101px] bg-gray-300 flex items-center justify-center text-sm text-gray-700">
                Footer Placeholder
            </div>         
        </>

    )
}