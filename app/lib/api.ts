import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HTTP_METHOD } from "next/dist/server/web/http";

export type KasaError = {
    error: string
}
const API_URL = process.env.API_URL ?? "http://localhost:3001";

export type KasaOk = {
    ok: boolean
}

export type AuthUser = {
    user: {
        id: number,
        name: string,
        email: string,
        picture: string,
        role: string
    }
}

export type AuthResponse = {
    token: string,
} & AuthUser | KasaError

export type PasswordResetRequestResponse = {
    message: string,
    token: string
} & KasaOk

export type ResetRequest = {
    token: string,
    password: string
}

export type PropertyHost = {
    id: number,
    name: string,
    picture: string
}

export type PropertyBase = {
    id: string,
    slug: string,
    title: string,
    description: string,
    cover: string,
    location: string,
    price_per_night: number,
    rating_avg: number,
    rating_count: number,
    host: PropertyHost
}

export type PropertyCreate = {
    id: string,
    slug: string,
    title: string,
    description: string,
    cover: string,
    location: string,
    price_per_night: number,
    host_id: number,
    host: {
        name: string,
        picture: string
    }
    pictures: Array<string>,
    equipments: string,
    tags: string
}

export type RegisterFields = "lastname" | "firstname" | LoginFields
export type LoginFields = "email" | "password"

export type FieldErrors<T extends RegisterFields = RegisterFields> = Partial<Record<T, string>>;

/** Réponse normalisée de l'API : toujours la même forme, succès ou erreur. */
export type ApiResult<T extends AuthResponse> = T | KasaError

/** Résultat renvoyé par les server actions aux formulaires et boutons. */
export type ActionResult<T extends Exclude<AuthResponse, "token">> = T | KasaError

type ApiRequestOptions = {
    method?: HTTP_METHOD;
    /** envoyé en JSON */
    body?: unknown;
    /**
     * true  -> sans token -> /login, token refusé (401) -> /logout.
     * false -> aucune redirection, le 401 est renvoyé tel quel :
     *   - connexion / inscription (un mauvais mot de passe répond 401)
     *   - Route Handlers appelés par fetch (ils répondent en JSON)
     */
    redirectOnUnauthorized?: boolean;
};

/**
 * Point d'accès à l'API.
 *
 * redirectOnUnauthorized: true -> sans token -> /login, token refusé (401) -> /logout.
 * redirectOnUnauthorized: false -> aucune redirection, le 401 est renvoyé tel quel :
 *   - connexion / inscription (un mauvais mot de passe répond 401)
 *   - Route Handlers appelés par fetch (ils répondent en JSON)
 *
 * @param path  chemin de l'API, ex. "/projects/12/tasks"
 * @example
 * const { ok, data, errors, fieldErrors } = await apiRequest("/projects", { method: "POST", body: { name } });
 */
export async function apiRequest<T extends AuthResponse>(path: string, { method = "GET", body, redirectOnUnauthorized = true }: ApiRequestOptions = {}): Promise<ApiResult<T>> {
    const token = (await cookies()).get("token")?.value;
    if (!token && redirectOnUnauthorized) {
        redirect("/login");
    }

    const headers = new Headers({ accept: "application/json" });
    if (body !== undefined) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch {
        // l'API ne répond pas du tout (serveur éteint, réseau coupé…)
        return { error: "Erreur 503 : Le serveur est injoignable. Réessayez dans quelques instants." };
    }

    console.log("response in api.js : ", response)

    // en dehors du try : redirect() lance une exception que le catch ne doit pas attraper
    if (response.status === 401 && redirectOnUnauthorized) {
        redirect("/logout");
    }

    const data = await response.json().catch(() => ({ error: `Erreur ${response.status} : Reponse de l'API invalide` })) || { error: `Erreur ${response.status} : Reponse de l'API invalide` };

    console.log("data dans api.ts : ", data)

    if (data.error) {
        return ({ error: data.error })
    } else {
        if (response.ok) return data;
    }
    return { error: `Erreur ${response.status} : Reponse de l'API invalide` };
}

/**
 * Crée le cookie de session (httpOnly) : il expire en même temps que le JWT.
 * @param token  JWT renvoyé par /auth/login ou /auth/register
 */
export async function setSessionCookie(token: string): Promise<void> {
    const { exp } = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    const cookieStore = await cookies();
    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: exp - Math.floor(Date.now() / 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}

/**
 * Une réponse en erreur contient soit une liste d'erreurs de validation (body.data.errors : { field, message }),
 * soit un message général (body.message).
 * Renvoie les messages sans champ ; ceux avec un champ vont dans getFieldErrors.
 */
// function getErrorMessages(body: ApiErrorBody, status: number): string[] {
//     const errors = body?.data?.errors;
//     if (Array.isArray(errors) && errors.length > 0) {
//         return errors.filter((error) => !error.field).map((error) => error.message);
//     }
//     // sinon le message général de l'API, ou un message générique (ex. réponse non JSON)
//     return [body?.message || `Une erreur est survenue (code ${status}).`];
// }

/**
 * Erreurs liées à un champ, indexées par le name du champ du formulaire.
 */
// function getFieldErrors(body: ApiErrorBody): FieldErrors {
//     const errors = body?.data?.errors;
//     if (!Array.isArray(errors)) return {};
//     return Object.fromEntries(
//         errors.filter((error) => error.field).map((error) => [error.field, error.message])
//     );
// }

/**
 * Pour un appel sans formulaire (suppression, contributeurs…) : toutes les erreurs dans une seule liste.
 */
// export function allErrors({ errors = [], fieldErrors }: Pick<ActionResult, "errors" | "fieldErrors">): string[] {
//     return [...errors, ...Object.values(fieldErrors ?? {})];
// }
