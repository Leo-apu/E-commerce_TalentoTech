import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import styles from "./CartPage.module.css";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const envioGratisDesde = 50000;
  const tieneEnvioGratis = totalPrice >= envioGratisDesde;
  const faltaParaEnvio = Math.max(0, envioGratisDesde - totalPrice);

  if (cartItems.length === 0) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.vacioCard}>
          <div className={styles.vacioIconoWrapper}>
            <FiShoppingBag size={48} />
          </div>
          <h2>Tu carrito está vacío</h2>
          <p>
            ¿No sabes qué comprar? ¡Miles de productos te esperan en nuestro
            catálogo!
          </p>
          <Link to="/productos" className={styles.botonExplorar}>
            <FiArrowLeft size={18} />
            <span>Ver todos los productos</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.cabecera}>
        <div>
          <h1 className={styles.titulo}>Carrito de Compras</h1>
          <p className={styles.subtitulo}>
            {totalItems} productos seleccionados
          </p>
        </div>
        <button className={styles.botonVaciar} onClick={clearCart}>
          <FiTrash2 size={16} />
          <span>Vaciar carrito</span>
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.itemsColumna}>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className={styles.itemCard}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Link to={`/producto/${item.id}`}>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className={styles.itemImagen}
                  />
                </Link>

                <div className={styles.itemDetalles}>
                  <div className={styles.itemHeader}>
                    <Link
                      to={`/producto/${item.id}`}
                      className={styles.itemNombreLink}
                    >
                      <h3>{item.nombre}</h3>
                    </Link>
                    <button
                      className={styles.botonEliminar}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Eliminar producto"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <p className={styles.itemPrecioUnitario}>
                    ${item.precio.toLocaleString("es-AR")} por unidad
                  </p>

                  <div className={styles.itemAcciones}>
                    <div className={styles.controlCantidad}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className={styles.btnQty}
                        aria-label="Restar una unidad"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className={styles.qtyNumero}>{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className={styles.btnQty}
                        aria-label="Sumar una unidad"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <div className={styles.itemSubtotal}>
                      <span>Subtotal:</span>
                      <strong>
                        ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                      </strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/productos" className={styles.linkSeguirComprando}>
            <FiArrowLeft size={16} />
            <span>Continuar comprando</span>
          </Link>
        </div>

        <div className={styles.resumenColumna}>
          <div className={styles.resumenCard}>
            <h3>Resumen de compra</h3>

            <div className={styles.resumenFila}>
              <span>Subtotal ({totalItems} productos)</span>
              <strong>${totalPrice.toLocaleString("es-AR")}</strong>
            </div>

            <div className={styles.resumenFila}>
              <span>Envío</span>
              {tieneEnvioGratis ? (
                <span className={styles.envioGratisBadge}>Gratis</span>
              ) : (
                <span>A calcular</span>
              )}
            </div>

            {!tieneEnvioGratis && (
              <div className={styles.envioAviso}>
                <FiTruck size={16} />
                <span>
                  Agrega{" "}
                  <strong>${faltaParaEnvio.toLocaleString("es-AR")}</strong>{" "}
                  para obtener <strong>Envío Gratis</strong>.
                </span>
              </div>
            )}

            <div className={styles.separador} />

            <div className={styles.totalFila}>
              <span>Total</span>
              <strong className={styles.precioFinal}>
                ${totalPrice.toLocaleString("es-AR")}
              </strong>
            </div>

            <button
              className={styles.botonPagar}
              onClick={() =>
                alert(
                  "¡Gracias por tu compra! Redirigiendo a pasarela de pago.",
                )
              }
            >
              <span>Finalizar Compra</span>
              <FiArrowRight size={18} />
            </button>

            <div className={styles.seguridadGarantia}>
              <FiShield size={16} />
              <span>Compra protegida y encriptada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
