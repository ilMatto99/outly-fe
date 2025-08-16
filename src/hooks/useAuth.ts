import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

/**
 * Hook personalizzato per accedere al contesto di autenticazione.
 *
 * @returns L'oggetto del contesto di autenticazione.
 * @throws Error se `useAuth` non viene utilizzato all'interno di un `AuthProvider`.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
