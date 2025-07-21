export const getLivelli = async () => {
    {/* TODO: sostituire con endpoint per recuperare tutti i livelli */}
    const response = await fetch("URL_API_LIVELLI");
    
    if(!response.ok) {
        throw new Error("Errore nella fetch a api livelli");
    }

    const data = response.json();

    return data;
}