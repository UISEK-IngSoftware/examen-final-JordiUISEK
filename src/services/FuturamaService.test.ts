/**
 * Pruebas unitarias del servicio FuturamaService.
 * Verifican el consumo de la API con los parámetros requeridos y el mapeo de la respuesta.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCharacters } from './FuturamaService';

const mockGet = vi.hoisted(() => vi.fn());
const mockCreate = vi.hoisted(() =>
  vi.fn(() => ({
    get: mockGet,
  }))
);

vi.mock('axios', () => ({
  default: {
    create: mockCreate,
  },
}));

describe('FuturamaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a la API con los parámetros orderBy, orderByDirection, page, size', async () => {
    mockGet.mockResolvedValueOnce({ data: { items: [] } });

    await fetchCharacters();

    expect(mockGet).toHaveBeenCalledWith('/characters', {
      params: {
        orderBy: 'id',
        orderByDirection: 'asc',
        page: 1,
        size: 50,
      },
    });
  });

  it('debe devolver el array de personajes mapeado desde response.data.items', async () => {
    const mockItems = [
      {
        id: 1,
        name: 'Philip J. Fry',
        gender: 'MALE',
        status: 'ALIVE',
        species: 'HUMAN',
        image: 'https://futuramaapi.com/static/img/human/philip-j_-fry.webp',
      },
    ];
    mockGet.mockResolvedValueOnce({ data: { items: mockItems } });

    const result = await fetchCharacters();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 1,
      name: 'Philip J. Fry',
      gender: 'MALE',
      status: 'ALIVE',
      species: 'HUMAN',
      image: 'https://futuramaapi.com/static/img/human/philip-j_-fry.webp',
    });
  });

  it('debe devolver array vacío cuando la API retorna items vacío', async () => {
    mockGet.mockResolvedValueOnce({ data: { items: [] } });

    const result = await fetchCharacters();

    expect(result).toEqual([]);
  });

  it('debe lanzar error cuando la petición falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchCharacters()).rejects.toThrow('Network Error');
  });
});
