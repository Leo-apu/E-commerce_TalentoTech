import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiCheck } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./Item.module.css";

function Item({ producto, paginaActual }) {
  const { id, nombre, precio, imagen, categoria } = producto;
  const [isFavorite, setIsFavorite] = useState(false);
  const [agregadoAnim, setAgregadoAnim] = useState(false);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some((fav) => fav.id === id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (isFavorite) {
        const nuevos = favorites.filter((fav) => fav.id !== id);
        localStorage.setItem("favorites", JSON.stringify(nuevos));
        setIsFavorite(false);
        window.dispatchEvent(new Event("storage"));
        toast("Quitado de favoritos", { icon: "💔" });
      } else {
        favorites.push(producto);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(true);
        window.dispatchEvent(new Event("storage"));
        toast.success(`${nombre} agregado a favoritos`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(producto, 1);
    setAgregadoAnim(true);
    setTimeout(() => setAgregadoAnim(false), 1400);
    toast.success(`${nombre} agregado al carrito`);
  };

  const valorCuota = Math.round(precio / 3);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.imagenContainer}>
        <Link
          to={`/producto/${id}`}
          state={{ from: location.pathname, pagina: paginaActual }}
          className={styles.imagenLink}
          aria-label={`Ver detalles de ${nombre}`}
        >
          <img
            className={styles.imagen}
            src={imagen}
            alt={nombre}
            loading="lazy"
          />
        </Link>

        <motion.button
          className={styles.favoritoBtn}
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          whileTap={{ scale: 0.85 }}
        >
          <span className={styles.iconoCorazon}>
            {isFavorite ? (
              <FaHeart size={18} color="var(--color-accent)" />
            ) : (
              <FiHeart size={18} color="var(--color-text-secondary)" />
            )}
          </span>
        </motion.button>

        {precio >= 50000 && (
          <span className={styles.badgeEnvio}>Envío Gratis</span>
        )}
      </div>

      <div className={styles.info}>
        {categoria && (
          <span className={styles.categoriaLabel}>{categoria}</span>
        )}

        <Link
          to={`/producto/${id}`}
          state={{ from: location.pathname, pagina: paginaActual }}
          className={styles.tituloLink}
        >
          <h3 className={styles.nombre}>{nombre}</h3>
        </Link>

        <div className={styles.preciosBloque}>
          <p className={styles.precio}>${precio.toLocaleString("es-AR")}</p>
          <p className={styles.cuotas}>
            3 cuotas de <strong>${valorCuota.toLocaleString("es-AR")}</strong>{" "}
            sin interés
          </p>
        </div>

        <motion.button
          className={`${styles.boton} ${agregadoAnim ? styles.botonAgregado : ""}`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
        >
          {agregadoAnim ? (
            <>
              <FiCheck size={17} />
              <span>¡Agregado!</span>
            </>
          ) : (
            <>
              <FiShoppingBag size={17} />
              <span>Agregar al carrito</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default Item;
