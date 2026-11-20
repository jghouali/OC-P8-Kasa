"use server"

import { redirect } from "next/navigation"
import { apiRequest, KasaError, setSessionCookie } from "../lib/api"
import { AuthResponse } from "../lib/api"

export async function login(_prevState: KasaError, formData: FormData): Promise<never | KasaError> {
    const [email, password] = [formData.get("email") ?? "", formData.get("password") ?? ""]

    const result = await apiRequest<AuthResponse>("/auth/login", { method: "POST", body: { email: email, password: password }, redirectOnUnauthorized: false })

    if ("error" in result) { return { error: result.error } }

    if ("user" in result && "token" in result) {
        await setSessionCookie(result.token);
        redirect("/");
    }
    return { error: "Réponse invalide de l'API" }
}

export async function register(_prevState: KasaError, formData: FormData): Promise<never | KasaError> {
    const [firstname, lastname, email, password] = [formData.get("firstname") ?? "", formData.get("lastname") ?? "", formData.get("email") ?? "", formData.get("password") ?? ""]

    const result = await apiRequest<AuthResponse>("/auth/register", { method: "POST", body: { firstname, lastname, email, password }, redirectOnUnauthorized: false })

    if ("error" in result) { return { error: result.error } }

    if ("user" in result && "token" in result) {
        await setSessionCookie(result.token);
        redirect("/");
    }
    return { error: "Réponse invalide de l'API" }
}