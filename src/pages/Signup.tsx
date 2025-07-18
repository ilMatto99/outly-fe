import Input from "@/components/Input/input"
import logo from "/images/logo-outly-2.jpg"
import Button from "@/components/Button/button"
import IconButton from "@/components/IconButton/IconButton"
import { useState, type FormEvent } from "react"
import { validateEmail } from "@/components/Input/useInput"

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isEmailValid = validateEmail(email);
    const isPasswordMatch = password === confirmPassword ;
    const isFormValid =
        username.trim() !== "" &&
        email.trim() !== "" &&
        isEmailValid &&
        password.trim() !== "" &&
        isPasswordMatch;

    const handleSignup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Registrazione:");
        console.log("Username: ", username);
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
            <div className="logo mb-8 mt-2">
                <img src={logo} alt="logo-outly" width={60} height={60} />
            </div>
            <div className="text-center w-full max-w-sm flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4"><b>Registrati</b></h1>

                <form onSubmit={handleSignup} className="w-80 mt-3 mb-6 space-y-4">
                    <Input
                        label="Nome utente"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        label="Conferma Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button label="Registrati" onClick={() => console.log("Form inviata")} className="w-full mt-5" disabled={!isFormValid}/>
                </form>


                <div className="w-full max-w-sm flex flex-col items-center mt-4">
                    <div className="relative w-full flex items-center justify-center mb-3">
                        <hr className="w-full border-gray-300" />
                        <span className="absolute bg-white px-3 text-gray-500 text-sm">oppure</span>
                    </div>
                    <div className="flex justify-center mt-3 space-x-8 w-full">
                        <IconButton label="" iconName="google" size={"large"} />
                        <IconButton label="" iconName="facebook" size={"large"} />
                        <IconButton label="" iconName="apple" size={"large"} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-0 space-y-3">
                <Button variant={"link"} label="Hai già un account?" onClick={() => console.log("vai a login")} />
            </div>

        </div>
    )
}