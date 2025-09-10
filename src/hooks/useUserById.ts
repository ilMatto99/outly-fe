import { useState, useEffect } from "react";
import { getUserById } from "@/api/getUserById";
import type { UtenteDTO } from "@/types/UtenteDTO";

export const useUserById = (id?: number) => {
  const [user, setUser] = useState<UtenteDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setUser(null);
      setError("ID utente non fornito");
      return;
    }

    setLoading(true);
    setError(null);

    getUserById(id)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Errore sconosciuto");
        setUser(null);
        setLoading(false);
      });
  }, [id]);

  return { user, loading, error };
};
