import * as React from 'react';
import './system-message.css'

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
    <div className={`system-message ${className || ""}`}>
      <span>{message}</span>
    </div>
  );
};

export default SystemMessage;
