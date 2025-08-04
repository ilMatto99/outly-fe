
export const timeCalculator = (time:string) =>  new Date(time).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        });