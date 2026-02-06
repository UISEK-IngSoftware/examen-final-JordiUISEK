// Interfaz de un personaje de la API de Futurama
export interface CharacterItem {
  id: number; // Identificador único del personaje
  name: string; // Nombre del personaje
  gender: string; // Género (MALE, FEMALE, OTHER)
  status: string; // Estado vital (ALIVE, DEAD, UNKNOWN)
  species: string; // Especie (HUMAN, ROBOT, ALIEN, etc.)
  image?: string; // URL de la imagen del personaje
}