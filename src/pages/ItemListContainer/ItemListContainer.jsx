import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiAlertCircle, FiInbox } from "react-icons/fi";
import ItemList from "../../components/ItemList/ItemList.jsx";
import ItemSkeleton from "../../components/ItemSkeleton/ItemSkeleton.jsx";
import styles from "./ItemListContainer.module.css";

function ItemListContainer() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    fetch("/productos.json")
      .then((res) => {
        if (!res.ok)
          throw new Error("No se pudo obtener el listado de productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.estadoMensaje}>
        <div className={styles.iconoAlerta}>
          <FiAlertCircle size={40} />
        </div>
        <h3>No pudimos cargar los productos</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.botonReintentar}
        >
          Reintentar
        </button>
      </div>
    );
  }

  const productosFiltrados = categoria
    ? productos.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase(),
      )
    : productos;

  if (productosFiltrados.length === 0) {
    return (
      <div className={styles.estadoMensaje}>
        <div className={styles.iconoVacio}>
          <FiInbox size={44} />
        </div>
        <h3>No hay productos en esta categoría</h3>
        <p>Pronto añadiremos nuevos artículos a esta sección.</p>
        <Link to="/productos" className={styles.botonVolverInicio}>
          Ver todos los productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      {categoria && (
        <div className={styles.cabeceraCategoria}>
          <h2 className={styles.tituloCategoria}>{categoria}</h2>
          <span className={styles.conteoCategoria}>
            {productosFiltrados.length} productos disponibles
          </span>
        </div>
      )}
      <ItemList productos={productosFiltrados} />
    </div>
  );
}

export default ItemListContainer;
