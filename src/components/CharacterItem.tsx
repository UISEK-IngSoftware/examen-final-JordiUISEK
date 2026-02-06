/** Importaciones */
import './CharacterItem.css';
import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { CharacterItem as CharacterItemComponent } from '../interfaces/CharacterItem';

/**
 * Renderiza una fila de listado con la imagen y datos de un personaje de Futurama.
 * @param {Object} props - Props del componente.
 * @param {import('../interfaces/CharacterItem').CharacterItem} props.character - Datos del personaje a mostrar.
 */
const CharacterItem: React.FC<{ character: CharacterItemComponent }> = ({ character }) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={character.image || 'futurama.png'} alt={character.name} />
      </IonAvatar>
      <IonLabel>
        <h2>{character.name}</h2>
        <p className="text"><strong className="character-bold">Género:</strong> {character.gender}</p>
        <p className="text"><strong className="character-bold">Estado:</strong> {character.status}</p>
        <p className="text"><strong className="character-bold">Especie:</strong> {character.species}</p>
      </IonLabel>
    </IonItem>
  );
};

export default CharacterItem;
