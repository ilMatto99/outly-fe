export const timeCalculator = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
