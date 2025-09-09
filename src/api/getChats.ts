export const getChats = async (idUtente:number) => {
    const response = await fetch(`http://localhost:8080/api/chat/carica?idUtente=${idUtente}`);
    const data = await response.json();
    return data;
}