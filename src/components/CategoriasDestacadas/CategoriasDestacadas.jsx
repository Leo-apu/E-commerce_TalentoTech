import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import styles from "./CategoriasDestacadas.module.css";

const categorias = [
  {
    nombre: "Tecnología",
    slug: "tecnologia",
    descripcion: "Dispositivos y gadgets",
    imagen: "https://picsum.photos/seed/cat-tech/600/400",
  },
  {
    nombre: "Indumentaria",
    slug: "indumentaria",
    descripcion: "Prendas y calzado urbano",
    imagen: "https://picsum.photos/seed/cat-ropa/600/400",
  },
  {
    nombre: "Accesorios",
    slug: "accesorios",
    descripcion: "Complementos y detalles",
    imagen: "https://picsum.photos/seed/cat-acc/600/400",
  },
];

function CategoriasDestacadas() {
  return (
    <section className={styles.seccion}>
      <div className={styles.cabecera}>
        <div>
          <h2 className={styles.tituloSeccion}>Categorías Destacadas</h2>
          <p className={styles.subtituloSeccion}>
            Encuentra exactamente lo que necesitas
          </p>
        </div>
      </div>

      <div className={styles.contenedor}>
        {categorias.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Link to={`/categoria/${cat.slug}`} className={styles.card}>
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className={styles.imagen}
                loading="lazy"
              />
              <div className={styles.overlay} />
              <div className={styles.info}>
                <span className={styles.descripcion}>{cat.descripcion}</span>
                <div className={styles.filaTitulo}>
                  <h3 className={styles.nombre}>{cat.nombre}</h3>
                  <span className={styles.flechaIcono}>
                    <FiArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default CategoriasDestacadas;
