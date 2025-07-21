//import { getCompletaRegistrazione } from "@/api/getCompletaRegistrazione";
import Button from "@/components/Button/button";
import Input from "@/components/Input/input";
import { useCompleteSignup } from "@/hooks/useCompleteSignup";
//import { useLivelli } from "@/hooks/useLivelli";
import type { LivelloDTO } from "@/types/LivelloDTO";
import type { ChangeEvent, FormEvent } from "react";
import { useLocation, /*useNavigate*/ } from "react-router";
import logo from "/images/logo-outly.jpg"

export const CompleteSignup = () => {
    const location = useLocation();
    //const navigate = useNavigate();

    const email = location.state?.email ?? "";
    const password = location.state?.passwordHash ?? "";

    {/* TODO: elimina mock e sostituisci con chiamata al backend per recuperare livelli */}
    const livelliMock: LivelloDTO[] = [
        { id: 1, nome: "base" },
        { id: 2, nome: "professionista" },
    ];

    //const { livelli } = useLivelli();
    const { formData, handleChange } = useCompleteSignup(email, password);

    const isFormValid = (): boolean => {
        return (
            formData.nome.trim() !== "" &&
            formData.cognome.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.passwordHash.trim() !== "" &&
            formData.bio.trim() !== "" &&
            formData.citta.trim() !== "" &&
            formData.livello !== undefined &&
            formData.livello !== null &&
            formData.livello !== 0
        );
    };

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            handleChange("avatarUrl", base64)
        };

        reader.readAsDataURL(file);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Chiamata al backend")
        /* await getCompletaRegistrazione(formData);
        navigate("/home"); */
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
                    onChange={(e) => handleChange("nome", e.target.value)}
                    required
                />
                <Input
                    label="Cognome"
                    onChange={(e) => handleChange("cognome", e.target.value)}
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={formData.passwordHash}
                    onChange={(e) => handleChange("passwordHash", e.target.value)}
                    required
                />
                <Input
                    label="Bio"
                    type="textarea"
                    onChange={(e) => handleChange("bio", e.target.value)}
                    required
                />
                <Input
                    label="Città"
                    onChange={(e) => handleChange("citta", e.target.value)}
                    required
                />

                <div className="flex flex-col gap-2">
                    <label>Livello</label>
                    <select
                        className="border rounded px-2 py-1"
                        onChange={(e) => handleChange("livello", Number(e.target.value))}
                        required
                    >
                        <option value="">Seleziona un livello</option>
                        {livelliMock.map((livello: LivelloDTO) => (
                            <option key={livello.id} value={livello.id}>
                                {livello.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Carica avatar</label>
                    <label
                        htmlFor="avatarUpload"
                        className="cursor-pointer border border-dashed border-gray-400 rounded-md p-4 text-center text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Clicca per scegliere un'immagine
                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                        />
                    </label>
                    {formData.avatarUrl && (
                        <img
                            src={formData.avatarUrl}
                            alt="Anteprima avatar"
                            className="w-20 h-20 rounded-full object-cover mt-2 self-center"
                        />
                    )}
                </div>

                <Button
                    label="Completa Registrazione"
                    onClick={() => console.log("Registrazione completa")}
                    disabled={!isFormValid}
                    className="w-full mt-3"
                />
            </form>
        </div>
    )
}