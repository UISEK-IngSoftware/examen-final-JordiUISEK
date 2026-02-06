/** Importaciones */
import { IonSpinner } from '@ionic/react';
import './LoadingSpinner.css';

/** Props del componente LoadingSpinner. */
interface LoadingSpinnerProps {
  isOpen: boolean;
}

/**
 * Muestra un overlay con spinner de carga mientras se realizan peticiones asíncronas.
 * @param {LoadingSpinnerProps} props - Props del componente.
 * @param {boolean} props.isOpen - Si es true, se muestra el spinner; si es false, no se renderiza nada.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="loading-overlay">
            <IonSpinner name="crescent" color="primary" className="loadingSpinner" />
        </div>
    );
};

export default LoadingSpinner;