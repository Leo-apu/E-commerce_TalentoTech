import { motion } from "framer-motion";
import { FiTruck, FiCreditCard, FiRotateCcw, FiShield } from "react-icons/fi";
import styles from "./BeneficiosBar.module.css";

const beneficios = [
  {
    icono: <FiTruck size={20} />,
    titulo: "Envío gratis",
    descripcion: "Desde $50.000 a todo el país",
  },
  {
    icono: <FiCreditCard size={20} />,
    titulo: "3 cuotas sin interés",
    descripcion: "Con todas las tarjetas",
  },
  {
    icono: <FiRotateCcw size={20} />,
    titulo: "Cambios sin cargo",
    descripcion: "Hasta 30 días posteriores",
  },
  {
    icono: <FiShield size={20} />,
    titulo: "Compra 100% segura",
    descripcion: "Garantía y protección total",
  },
];

function BeneficiosBar() {
  return (
    <div className={styles.contenedor}>
      <motion.div
        className={styles.barra}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {beneficios.map((b, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.iconoWrapper}>{b.icono}</div>
            <div className={styles.textoWrapper}>
              <span className={styles.titulo}>{b.titulo}</span>
              <span className={styles.descripcion}>{b.descripcion}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default BeneficiosBar;
