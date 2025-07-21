export const getLivelli = async () => {
    const response = await fetch("URL_API_LIVELLI");
    
    if(!response.ok) {
        throw new Error("Errore nel recupero dei livelli");
    }

    const data = response.json();

    return data;
}