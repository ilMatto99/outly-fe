export interface AuthContextType {
    userId: number | null;
    setUserId: (id: number | null) => void;
    loadingAuth: boolean;
}