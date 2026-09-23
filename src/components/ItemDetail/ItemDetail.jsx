import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiHeart,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./ItemDetail.module.css";

function ItemDetail({ producto }) {
  const { id, nombre, precio, descripcion, categoria, imagen } = producto;
  const [cantidad, setCantidad] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some((fav) => fav.id === id));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  const toggleFavorite = () => {
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

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    toast.success(`${cantidad} x ${nombre} agregado al carrito`);
    openCart();
  };

  const returnPath = location.state?.from || "/";
  const pagina = location.state?.pagina;
  const valorCuota = Math.round(precio / 3);

  return (
    <div className={styles.contenedor}>
      <div className={styles.topBar}>
        <Link
          to={returnPath}
          state={pagina !== undefined ? { pagina } : undefined}
          className={styles.botonVolver}
        >
          <FiArrowLeft size={18} />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      <div className={styles.detalleCard}>
        <div className={styles.columnaImagen}>
          <div className={styles.imagenWrapper}>
            <img className={styles.imagen} src={imagen} alt={nombre} />
            <button
              className={styles.favoritoBtn}
              onClick={toggleFavorite}
              aria-label={
                isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
              }
            >
              {isFavorite ? (
                <FaHeart size={20} color="var(--color-accent)" />
              ) : (
                <FiHeart size={20} color="var(--color-text-secondary)" />
              )}
            </button>
          </div>
        </div>

        <div className={styles.columnaInfo}>
          {categoria && (
            <span className={styles.categoriaTag}>{categoria}</span>
          )}

          <h1 className={styles.nombre}>{nombre}</h1>

          <div className={styles.precioContenedor}>
            <p className={styles.precio}>${precio.toLocaleString("es-AR")}</p>
            <p className={styles.cuotasInfo}>
              💳 3 cuotas sin interés de{" "}
              <strong>${valorCuota.toLocaleString("es-AR")}</strong>
            </p>
          </div>

          <p className={styles.descripcion}>{descripcion}</p>

          <div className={styles.accionesCompra}>
            <div className={styles.selectorCantidad}>
              <button
                type="button"
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                className={styles.btnCantidad}
                aria-label="Restar una unidad"
              >
                <FiMinus size={16} />
              </button>
              <span className={styles.cantidadDisplay}>{cantidad}</span>
              <button
                type="button"
                onClick={() => setCantidad((prev) => prev + 1)}
                className={styles.btnCantidad}
                aria-label="Sumar una unidad"
              >
                <FiPlus size={16} />
              </button>
            </div>

            <motion.button
              className={styles.botonAgregar}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
            >
              <FiShoppingBag size={18} />
              <span>Agregar al carrito</span>
            </motion.button>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcono}>
                <FiTruck size={18} />
              </div>
              <div>
                <strong>Envío gratis</strong>
                <p>En compras mayores a $50.000 a todo el país.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcono}>
                <FiRotateCcw size={18} />
              </div>
              <div>
                <strong>Cambio y devolución gratis</strong>
                <p>Tenés 30 días para cambiar tu producto.</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcono}>
                <FiShield size={18} />
              </div>
              <div>
                <strong>Garantía oficial</strong>
                <p>12 meses de garantía directa de fábrica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
