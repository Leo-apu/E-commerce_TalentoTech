import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import styles from "./CartDrawer.module.css";
import toast from "react-hot-toast";

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const envioGratisDesde = 50000;
  const faltaParaEnvio = Math.max(0, envioGratisDesde - totalPrice);
  const porcentajeEnvio = Math.min(100, (totalPrice / envioGratisDesde) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitulo}>
                <FiShoppingBag size={22} />
                <h2>Tu Carrito</h2>
                <span className={styles.contadorBadge}>{totalItems}</span>
              </div>
              <button
                className={styles.botonCerrar}
                onClick={closeCart}
                aria-label="Cerrar carrito"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className={styles.envioBarraContenedor}>
              <div className={styles.envioTexto}>
                {faltaParaEnvio > 0 ? (
                  <span>
                    Te faltan{" "}
                    <strong>${faltaParaEnvio.toLocaleString("es-AR")}</strong>{" "}
                    para <strong>Envío Gratis</strong>
                  </span>
                ) : (
                  <span className={styles.envioConseguido}>
                    🎉 ¡Felicidades! Tienes <strong>Envío Gratis</strong>
                  </span>
                )}
              </div>
              <div className={styles.barraFondo}>
                <div
                  className={styles.barraProgreso}
                  style={{ width: `${porcentajeEnvio}%` }}
                />
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className={styles.vacio}>
                <div className={styles.vacioIcono}>
                  <FiShoppingBag size={48} />
                </div>
                <h3>Tu carrito está vacío</h3>
                <p>
                  Explora nuestras categorías y encuentra tus productos
                  favoritos.
                </p>
                <button className={styles.botonExplorar} onClick={closeCart}>
                  Explorar catálogo
                </button>
              </div>
            ) : (
              <div className={styles.itemsLista}>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={styles.item}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className={styles.itemImagen}
                    />
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeader}>
                        <h4 className={styles.itemNombre}>{item.nombre}</h4>
                        <button
                          className={styles.botonQuitar}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Eliminar ${item.nombre}`}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      <p className={styles.itemPrecioUnitario}>
                        ${item.precio.toLocaleString("es-AR")} c/u
                      </p>

                      <div className={styles.itemFooter}>
                        <div className={styles.cantidadControles}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className={styles.btnCantidad}
                            aria-label="Disminuir cantidad"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className={styles.cantidadNumero}>
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className={styles.btnCantidad}
                            aria-label="Aumentar cantidad"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                        <span className={styles.itemSubtotal}>
                          $
                          {(item.precio * item.cantidad).toLocaleString(
                            "es-AR",
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span className={styles.precioTotal}>
                    ${totalPrice.toLocaleString("es-AR")}
                  </span>
                </div>
                <p className={styles.impuestosNota}>
                  Envío e impuestos calculados en el checkout
                </p>
                <button
                  className={styles.botonCheckout}
                  onClick={() =>
                    toast.success("¡Redirigiendo a pasarela de pago segura!")
                  }
                >
                  <span>Iniciar Compra</span>
                  <FiArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
