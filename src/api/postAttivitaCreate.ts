import type { AttivitaDTO } from "@/types/AttivitaDTO";
import { BASE_URL_ATTIVITA } from "./config";

export async function creaAttivita(attivita: Omit<AttivitaDTO, 'id'>) {
    const resp = await fetch(`${BASE_URL_ATTIVITA}creazione`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attivita),
    });
    const contentType = resp.headers.get('content-type') || '';
    let body: any = null;
    if (contentType.includes('application/json')) body = await resp.json();
    else body = await resp.text();

    return { status: resp.status, ok: resp.ok, body };
}