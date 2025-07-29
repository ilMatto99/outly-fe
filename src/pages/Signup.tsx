import Input from "@/components/Input/input";
import logo from "/images/logo-outly.jpg";
import Button from "@/components/Button/button";
import IconButton from "@/components/IconButton/IconButton";
import { useState, type FormEvent } from "react";
import { validateEmail } from "@/components/Input/useInput";
import { Link, useLocation, useNavigate } from "react-router";
import { startGoogleLogin } from "@/api/startGoogleLogin";

/**
 * Componente di pagina per la registrazione di un nuovo utente.
 * Permette agli utenti di creare un account con email e password, o tramite Google.
 * Reindirizza alla pagina di completamento registrazione dopo l'input iniziale.
 */

export const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Legge i valori eventualmente passati da useAutenticazione
    const initialEmail = location.state?.email ?? "";
    const initialPassword = location.state?.passwordHash ?? "";
    const utenteNonTrovato = location.state?.utenteNonTrovato ?? false;

    // Stati del form
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);
    const [confirmPassword, setConfirmPassword] = useState(initialPassword);

    const isEmailValid = validateEmail(email);
    const isPasswordMatch = password === confirmPassword;

    const isFormValid =
        email.trim() !== "" &&
        isEmailValid &&
        password.trim() !== "" &&
        isPasswordMatch;

    /**
     * Gestisce l'invio del form di registrazione.
     * Previene il comportamento predefinito del form.
     * @param e L'evento del form.
     */
    const handleSignup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    /**
     * Reindirizza l'utente alla pagina di completamento registrazione se il form è valido.
     * Passa l'email e la password inserite come stato alla nuova pagina.
     */
    const handleCompleteSignup = () => {
        if (isFormValid) {
            navigate("/complete-signup", {
                state: {
                    email,
                    passwordHash: password
                }
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
            <div className="logo mb-8 mt-2">
                <img src={logo} alt="logo-outly" width={60} height={60} />
            </div>
            <div className="text-center w-full max-w-sm flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4"><b>Registrati</b></h1>

                <form onSubmit={handleSignup} className="w-80 mt-3 mb-6 space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <Input
                        label="Conferma Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />

                    {utenteNonTrovato && (
                        <p className="text-red-500 text-sm text-center mt-2">
                            Nessun utente trovato con questa email. Crea un nuovo account.
                        </p>
                    )}

                    <Button label="Registrati" onClick={handleCompleteSignup} className="w-full mt-5" disabled={!isFormValid} />
                </form>

                <div className="w-full max-w-sm flex flex-col items-center mt-4">
                    <div className="relative w-full flex items-center justify-center mb-3">
                        <hr className="w-full border-gray-300" />
                        <span className="absolute bg-white px-3 text-gray-500 text-sm">oppure</span>
                    </div>
                    <div className="flex justify-center mt-3 space-x-8 w-full">
                        <IconButton label="" iconName="google" size={"large"} onClick={startGoogleLogin} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-0 space-y-3">
                <Link to={"/login"}>
                    <Button variant={"link"} label="Hai già un account?" onClick={() => console.log("vai a login")} />
                </Link>
            </div>
        </div>
    );
};
