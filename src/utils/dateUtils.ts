/**
 * Converte un oggetto `Date` in una stringa di data e ora locale in formato `YYYY-MM-DDTHH:mm:ss`.
 *
 * Questo formato è comunemente utilizzato per scambiare date e ore tra il frontend e il backend,
 * garantendo la corretta interpretazione dei valori temporali senza fusi orari.
 *
 * @param date L'oggetto Date da convertire.
 * @returns La stringa della data e ora formattata.
 */
export const toLocalDateTimeString = (date: Date): string => {
  return date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0") + "T" +
    String(date.getHours()).padStart(2, "0") + ":" +
    String(date.getMinutes()).padStart(2, "0") + ":" +
    String(date.getSeconds()).padStart(2, "0");
};
