import { useAuthCallBack } from "@/hooks/useAuthCallBack";

/**
 * Componente di pagina per la gestione del callback di autenticazione.
 * Mostra un messaggio di caricamento mentre i dati dell'utente vengono verificati e l'utente viene reindirizzato alla pagina appropriata (home o completamento registrazione).
 */

export const AuthCallBack = () => {

    useAuthCallBack(); 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
            <p className="text-xl font-semibold mb-4">Stiamo verificando i tuoi dati...</p>
            <p className="text-sm">Potresti essere reindirizzato a breve.</p>
        </div>
    );
};