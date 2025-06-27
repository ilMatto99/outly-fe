import * as React from 'react';
import { cn } from "@/lib/utils"; 
import "../../../index.css"

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