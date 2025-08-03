import Button from "@/components/Button/button";
import Input from "@/components/Input/input";
import { useCompleteSignup } from "@/hooks/useCompleteSignup";
import { useLivelli } from "@/hooks/useLivelli";
import type { Livello } from "@/types/Livello";
import type { LocationState } from "@/types/UtenteParzialeDTO";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import logo from "/images/logo-outly.jpg";
import { validateEmail } from "@/components/Input/useInput";

/**
 * Componente di pagina per il completamento della registrazione dell'utente.
 * Permette agli utenti di inserire i dati del profilo come nome, cognome, email,
 * password, bio, città, URL dell'avatar e livello.
 * I campi possono essere precompilati se l'utente proviene da un'autenticazione esterna (es. Google).
 */

export const CompleteSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = (location.state || {}) as LocationState; 

    const [nome, setNome] = useState(state.nome || "");
    const [cognome, setCognome] = useState(state.cognome || "");
    const [email, setEmail] = useState(state.email || "");
    const [password, setPassword] = useState(state.passwordHash || "");
    const [bio, setBio] = useState("");
    const [citta, setCitta] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(state.avatarUrl || "");
    const [livello, setLivello] = useState<number | null>(null);

    const { handleRegistrazione, loading, error } = useCompleteSignup();
    const { livelli } = useLivelli();

    const isAvatarProvided = avatarUrl.trim() !== "";

    // Se proviene da Google, la password sarà un campo da riempire obbligatoriamente
    // prima di completare la registrazione.
    const isPasswordSet = password.trim() !== "";

    const isFormValid =
        nome.trim() !== "" &&
        cognome.trim() !== "" &&
        validateEmail(email) &&
        isPasswordSet && 
        bio.trim() !== "" &&
        citta.trim() !== "" &&
        isAvatarProvided &&
        livello !== null;

    const handleAvatarUrlChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAvatarUrl(e.target.value);
    };

    /**
     * Gestisce l'invio del form di registrazione.
     * Previene il comportamento predefinito del form, crea un DTO dell'utente
     * e chiama la funzione `handleRegistrazione` per inviare i dati al backend.
     * In caso di successo, naviga alla home page.
     * @param e L'evento del form.
     */
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const utenteDTO = {
            nome,
            cognome,
            email,
            passwordHash: password,
            bio,
            citta,
            avatarUrl: avatarUrl,
            livello: livello as number
        };

        try {
            await handleRegistrazione(utenteDTO);
            console.log(utenteDTO);
            navigate("/home");
        } catch (error) {
            console.error("Errore nella registrazione completa:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 flex flex-col">
            <div className="text-center mb-3">
                <img
                    src={logo}
                    alt="Logo Outly"
                    className="w-16 h-auto mx-auto mb-2"
                />
                <h1 className="text-3xl font-bold text-gray-800">
                    Completa la registrazione
                </h1>
                <p className="text-sm text-gray-500 mt-3">
                    Inserisci i dati del tuo profilo
                </p>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <Input 
                    label="Nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                    readOnly={!!state.nome} 
                />
                <Input 
                    label="Cognome" 
                    value={cognome} 
                    onChange={(e) => setCognome(e.target.value)} 
                    required 
                    readOnly={!!state.cognome}
                />
                <Input 
                    label="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    readOnly={!!state.email}
                />
                <Input 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    placeholder="Imposta una password"
                />
                <Input 
                    label="Bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    required 
                />
                <Input 
                    label="Città" 
                    value={citta} 
                    onChange={(e) => setCitta(e.target.value)} 
                    required 
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Livello</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={livello ?? ""}
                        onChange={(e) => setLivello(Number(e.target.value))}
                        required
                    >
                        <option value="">Seleziona un livello</option>
                        {livelli.map((livello: Livello) => (
                            <option key={livello.id} value={livello.id}>
                                {livello.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Carica avatar</label>
                    <Input
                        label=""
                        value={avatarUrl}
                        onChange={handleAvatarUrlChange}
                        placeholder="Es. https://example.com/avatar.jpg"
                    />

                    {/* Mostra l'anteprima se presente un URL */}
                    {isAvatarProvided && (
                        <img
                            src={avatarUrl}
                            alt="Anteprima avatar"
                            className="w-20 h-20 rounded-full object-cover mt-2 self-center"
                        />
                    )}
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {loading && <p >Registrazione in corso...</p>}

                <Button
                    label="Completa registrazione"
                    type="submit"
                    onClick={() => console.log("Registrazione completa")}
                    disabled={!isFormValid}
                    className="w-full mt-3"
                />
            </form >
        </div >
    )
}