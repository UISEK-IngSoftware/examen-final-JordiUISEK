/**
 * Pruebas unitarias del CharacterItem.
 * Verifican que se muestren imagen, nombre, género, estado vital y especie.
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterItem from './CharacterItem';
import { CharacterItem as CharacterItemType } from '../interfaces/CharacterItem';

const mockCharacter: CharacterItemType = {
  id: 1,
  name: 'Philip J. Fry',
  gender: 'MALE',
  status: 'ALIVE',
  species: 'HUMAN',
  image: 'https://futuramaapi.com/static/img/philip.webp',
};

describe('CharacterItem', () => {
  it('debe renderizar el nombre del personaje', () => {
    render(<CharacterItem character={mockCharacter} />);
    expect(screen.getByText('Philip J. Fry')).toBeInTheDocument();
  });

  it('debe mostrar el género del personaje', () => {
    render(<CharacterItem character={mockCharacter} />);
    expect(screen.getByText(/Género:/)).toBeInTheDocument();
    expect(screen.getByText(/MALE/)).toBeInTheDocument();
  });

  it('debe mostrar el estado vital del personaje', () => {
    render(<CharacterItem character={mockCharacter} />);
    expect(screen.getByText(/Estado:/)).toBeInTheDocument();
    expect(screen.getByText(/ALIVE/)).toBeInTheDocument();
  });

  it('debe mostrar la especie del personaje', () => {
    render(<CharacterItem character={mockCharacter} />);
    expect(screen.getByText(/Especie:/)).toBeInTheDocument();
    expect(screen.getByText(/HUMAN/)).toBeInTheDocument();
  });

  it('debe mostrar la imagen con el alt correcto', () => {
    render(<CharacterItem character={mockCharacter} />);
    const img = screen.getByRole('img', { name: 'Philip J. Fry' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCharacter.image);
  });

  it('debe usar imagen por defecto cuando image no está definida', () => {
    const characterSinImagen = { ...mockCharacter, image: undefined };
    render(<CharacterItem character={characterSinImagen} />);
    const img = screen.getByRole('img', { name: 'Philip J. Fry' });
    expect(img).toHaveAttribute('src', 'futurama.png');
  });
});
