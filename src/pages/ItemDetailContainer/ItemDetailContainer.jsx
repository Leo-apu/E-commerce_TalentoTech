import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import ItemDetail from "../../components/ItemDetail/ItemDetail.jsx";
import styles from "./ItemDetailContainer.module.css";

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    fetch("/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo cargar el producto");
        return respuesta.json();
      })
      .then((data) => {
        const encontrado = data.find((p) => p.id === Number(id));
        setProducto(encontrado || null);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
      <div className={styles.loadingContenedor}>
        <div className={styles.spinner} />
        <p className={styles.mensajeCargando}>
          Cargando información del producto...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.estadoMensaje}>
        <FiAlertCircle size={40} className={styles.iconoAlerta} />
        <h3>Ocurrió un error al cargar el producto</h3>
        <p>{error}</p>
        <Link to="/productos" className={styles.botonVolver}>
          <FiArrowLeft size={16} />
          <span>Volver al catálogo</span>
        </Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className={styles.estadoMensaje}>
        <FiAlertCircle size={40} className={styles.iconoAlerta} />
        <h3>Producto no encontrado</h3>
        <p>El artículo que buscas no existe o ha sido retirado.</p>
        <Link to="/productos" className={styles.botonVolver}>
          <FiArrowLeft size={16} />
          <span>Explorar otros productos</span>
        </Link>
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
}

export default ItemDetailContainer;
