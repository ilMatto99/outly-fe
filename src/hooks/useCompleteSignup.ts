import type { UtenteDTO } from "@/types/UtenteDTO";
import { useState } from "react";

export const useCompleteSignup = (initialEmail: string, initialPassword: string) => {
    const [formData, setFormData] = useState<UtenteDTO>({
    nome: "",
    cognome: "",
    email: initialEmail,
    passwordHash: initialPassword,
    bio: "",
    avatarUrl: "", 
    livello: 0,
    citta: ""
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
    }));
  };

  return {formData, setFormData, handleChange}
}