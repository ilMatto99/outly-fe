/**
 * Reindirizza l'utente alla pagina di autenticazione Google OAuth2.
 * Avvia il flusso di login tramite Google.
 */

export const startGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}