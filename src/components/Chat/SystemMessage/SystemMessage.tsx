import * as React from 'react';
import { cn } from "@/lib/utils"; 
import "../../../index.css"

/**
 * Componente riutilizzabile per un messaggio di sistema.
 *
 * Visualizza un messaggio di sistema centrato e formattato con uno sfondo
 * discreto per differenziarlo dalle normali bolle di chat. È ideale per
 * notificare eventi come l'ingresso di un utente, l'aggiornamento di un'attività, ecc.
 */
interface SystemMessageProps {
  message: string;
  className?: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message, className }) => {
  return (
    <div
      className={cn(
        "my-2 flex w-full justify-center text-center font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif]",
        className
      )}
    >
      <span className="inline-block rounded-lg bg-gray-200 px-3 py-1.5 text-sm text-gray-700">
        {message}
      </span>
    </div>
  );
};

export default SystemMessage;