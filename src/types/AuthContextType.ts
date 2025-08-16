/**
 * Tipo di dato per il contesto di autenticazione.
 */
export interface AuthContextType {
    userId: number | null;
    setUserId: (id: number | null) => void;
    loadingAuth: boolean;
}