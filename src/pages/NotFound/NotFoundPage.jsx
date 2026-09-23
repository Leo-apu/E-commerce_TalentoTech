import { Link } from "react-router-dom";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <div className={styles.iconoWrapper}>
          <FiAlertTriangle size={48} />
        </div>
        <span className={styles.errorCodigo}>404</span>
        <h1 className={styles.titulo}>Página no encontrada</h1>
        <p className={styles.descripcion}>
          Lo sentimos, la página que buscas no existe, ha sido movida o la
          dirección es incorrecta.
        </p>
        <Link to="/" className={styles.botonInicio}>
          <FiHome size={18} />
          <span>Volver a la página principal</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
