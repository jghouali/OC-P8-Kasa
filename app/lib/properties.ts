import { apiRequest, KasaError, PropertyBase, PropertyDetail } from "./api";

export async function getProperties(): Promise<Array<PropertyBase> | KasaError> {
    const result = await apiRequest<Array<PropertyBase>>("/api/properties", { method: "GET", redirectOnUnauthorized: false })

    if ("error" in result) { return { error: result.error } }

    if (Array.isArray(result)) {
        return result
    }
    return { error: "Réponse invalide de l'API" }
}

export async function getPropertiesDetail(id: string): Promise<PropertyDetail | KasaError> {
    const result = await apiRequest<PropertyDetail>(`/api/properties/${id}`, { method: "GET", redirectOnUnauthorized: false })

    if ("error" in result) { return { error: result.error } }

    if (result.id) {
        return result
    }
    return { error: "Réponse invalide de l'API" }
}