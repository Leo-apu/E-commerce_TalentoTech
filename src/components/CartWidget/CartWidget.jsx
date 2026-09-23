import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import styles from "./CartWidget.module.css";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/carrito"
      className={styles.cartWidget}
      aria-label="Ver carrito de compras"
    >
      <FiShoppingBag size={20} />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            className={styles.badge}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default CartWidget;
