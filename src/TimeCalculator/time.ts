export const timeCalculator = (time: string) => {
  const date = new Date(time);
  if (isNaN(date.getTime())) {
    // fallback se la stringa non è valida
    console.warn("Data non valida:", time);
    return "";
  }
  return date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
