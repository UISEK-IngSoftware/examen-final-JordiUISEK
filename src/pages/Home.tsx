/** Importaciones */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonList, IonTitle, IonToolbar, IonItem, IonThumbnail, IonLabel, useIonViewDidEnter } from '@ionic/react';
import CharacterItem from '../components/CharacterItem';
import './Home.css';
import { CharacterItem as CharacterItemComponent } from '../interfaces/CharacterItem';
import { fetchCharacters } from '../services/FuturamaService';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Página principal de la aplicación.
 * Muestra una lista de personajes de Futurama y maneja el estado de carga y errores.
 */
const Home: React.FC = () => {

  // Estados
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [characters, setCharacters] = React.useState<CharacterItemComponent[]>([]);

  /**
   * Carga los personajes de Futurama desde la API.
   */
  const loadCharacters = async () => {
    setLoading(true);
    setError(null);
    let charactersData: CharacterItemComponent[] = [];
    try {
      charactersData = await fetchCharacters();
      if (charactersData.length === 0) {
        setError("No hay personajes.");
      }
    } catch (err) {
      setError(`Error al cargar los datos: ${err}`);
    }

    setCharacters(charactersData);
    setLoading(false);
  };

  /**
   * Carga los personajes de Futurama cuando la página se carga
   */
  useIonViewDidEnter(() => {
    console.log('***** Cargando personajes de Futurama *****');
    loadCharacters();
  });

  /**
   * Renderiza la página
   */
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Futurama</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {error ? (
            <IonItem>
            <IonThumbnail slot="start">
              <img src='futurama.png' alt='Futurama' />
            </IonThumbnail>
            <IonLabel>
              <h2>Futurama</h2>
              <p>{error}</p>
            </IonLabel>
          </IonItem>
          ) : (
            characters.map((character) => (
              <CharacterItem key={character.id} character={character} />
            ))
          )}
        </IonList>
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
