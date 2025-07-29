import { postCompletaRegistrazione } from "@/api/postCompletaRegistrazione";
import type { UtenteDTO } from "@/types/UtenteDTO";
import { useState } from "react";
import { useNavigate } from "react-router";

/**
 * Hook personalizzato per gestire il completamento della registrazione utente.
 *
 * @returns Un oggetto contenente la funzione `handleRegistrazione`, lo stato `loading` e lo stato `error`.
 */

export const useCompleteSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  /**
   * Gestisce il processo di registrazione di un nuovo utente.
   *
   * - Imposta lo stato `loading` a `true` prima di effettuare la chiamata API.
   * - Invia i dati dell'utente a `postCompletaRegistrazione`.
   * - In caso di successo, naviga alla pagina `/home`.
   * - In caso di errore, imposta il messaggio di errore.
   * - Reimposta lo stato `loading` a `false` al termine dell'operazione.
   *
   * @param utente Il DTO contenente tutti i dati necessari per completare la registrazione dell'utente.
   */
  
  async function handleRegistrazione(utente: UtenteDTO) {
    try {
      setLoading(true);
      console.log(utente)
      await postCompletaRegistrazione(utente);
      navigate("/home");
    } catch(error) {
      setError((error as Error).message || "Errore nella registrazione");
    } finally {
      setLoading(false);
    }
  }

  return { handleRegistrazione, loading, error }
}
