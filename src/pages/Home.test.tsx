/**
 * Pruebas unitarias de la página Home.
 * Verifican carga de personajes, estados de loading, error y lista.
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { CharacterItem as CharacterItemType } from '../interfaces/CharacterItem';

const mockCharacters: CharacterItemType[] = [
  {
    id: 1,
    name: 'Philip J. Fry',
    gender: 'MALE',
    status: 'ALIVE',
    species: 'HUMAN',
    image: 'https://futuramaapi.com/static/img/philip.webp',
  },
];

const mockFetchCharacters = vi.hoisted(() => vi.fn());

vi.mock('../services/FuturamaService', () => ({
  fetchCharacters: () => mockFetchCharacters(),
}));

vi.mock('@ionic/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@ionic/react')>();
  return {
    ...actual,
    useIonViewDidEnter: (callback: () => void) => {
      React.useEffect(() => {
        callback();
      }, []);
    },
  };
});

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar el título Futurama en el encabezado', async () => {
    mockFetchCharacters.mockResolvedValueOnce([]);
    render(<Home />);
    await screen.findByText('No hay personajes.');
    expect(screen.getAllByText('Futurama').length).toBeGreaterThan(0);
  });

  it('debe cargar y mostrar la lista de personajes al montar', async () => {
    mockFetchCharacters.mockResolvedValueOnce(mockCharacters);
    render(<Home />);

    expect(await screen.findByText('Philip J. Fry')).toBeInTheDocument();
    expect(mockFetchCharacters).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar mensaje de error cuando la API falla', async () => {
    mockFetchCharacters.mockRejectedValueOnce(new Error('Network Error'));
    render(<Home />);

    expect(await screen.findByText('Error al cargar los datos: Error: Network Error')).toBeInTheDocument();
  });

  it('debe mostrar mensaje cuando no hay personajes', async () => {
    mockFetchCharacters.mockResolvedValueOnce([]);
    render(<Home />);

    expect(await screen.findByText('No hay personajes.')).toBeInTheDocument();
  });
});
