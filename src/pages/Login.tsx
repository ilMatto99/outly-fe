import Input from "@/components/Input/input"
import logo from "/images/logo-outly-2.jpg"
import Button from "@/components/Button/button"
import IconButton from "@/components/IconButton/IconButton"
import { useState, type FormEvent } from "react"

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login attempt:");
        console.log("Username: ", username);
        console.log("Password: ", password);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
            <div className="logo mb-8 mt-2" >
                <img src={logo} alt="logo-outly" width={60} height={60} />
            </div >
            <div className="text-center w-full max-w-sm flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4"><b>Accedi</b></h1>
                <form onSubmit={handleLogin} className="w-80 mt-3 mb-6 space-y-4">
                    <Input
                        label="Nome utente"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <Button label="Accedi" type="submit" className="w-full mt-5" onClick={() => console.log("Form inviata")} disabled={!isFormValid}/>
                </form>


                <div className="w-full max-w-sm flex flex-col items-center mt-8">
                    <div className="relative w-full flex items-center justify-center mb-6">
                        <hr className="w-full border-gray-300" />
                        <span className="absolute bg-white px-3 text-gray-500 text-sm">oppure</span>
                    </div>
                    <div className="flex justify-center mt-5 space-x-8 w-full">
                        <IconButton label="Google" iconName="google" size={"large"} />
                        <IconButton label="Facebook" iconName="facebook" size={"large"} />
                        <IconButton label="Apple" iconName="apple" size={"large"} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-6 space-y-3">
                <Button variant={"link"} label="Crea un nuovo account" onClick={() => console.log("vai a signup")} />
                <Button variant={"link"} label="Hai dimenticato la password?" onClick={() => console.log("password reset")} />
            </div>
        </div >
    )
}