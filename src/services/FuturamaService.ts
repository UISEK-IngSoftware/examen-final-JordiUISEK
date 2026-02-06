/** Importaciones */
import axios from "axios";
import { CharacterItem } from "../interfaces/CharacterItem";

/** URL base de la API de Futurama */
const FUTURAMA_API_URL = "https://futuramaapi.com/api";

/** Instancia de axios configurada con la URL base de la API de Futurama. */
const futuramaApi = axios.create({
    baseURL: FUTURAMA_API_URL,
});

/**
 * Obtiene la lista de personajes desde la API de Futurama.
 * @returns {Promise<CharacterItem[]>} Promesa que resuelve con un array de {@link CharacterItem}.
 * @throws Lanza el error si la petición HTTP falla.
 */
export const fetchCharacters = async (): Promise<CharacterItem[]> => {
 
    try {
        const response = await futuramaApi.get<{ items: CharacterItem[] }>(`/characters`, {
            params: {
                orderBy: "id",
                orderByDirection: "asc",
                page: 1,
                size: 50,
            },
        });

        const charactersData: CharacterItem[] = (response.data.items ?? []).map((character: {
            id: number;
            name: string;
            gender: string;
            status: string;
            species: string;
            image?: string;
        }) => ({
            id: character.id,
            name: character.name,
            gender: character.gender,
            status: character.status,
            species: character.species,
            image: character.image,
        }));
        return charactersData;
    } catch (error) {
        console.error("Error al obtener los personajes de la API de Futurama", error);
        throw error;
    }
};