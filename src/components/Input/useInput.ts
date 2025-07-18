import { useState } from "react";

export function usePasswordToggle(initialType: 'text' | 'password') {
    const [inputType, setInputType] = useState<'text' | 'password'>(initialType);

    const toggleVisibility = () => {
        setInputType(prev => prev === 'password' ? 'text' : 'password');
    }

    return { inputType, toggleVisibility }
}

export function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}