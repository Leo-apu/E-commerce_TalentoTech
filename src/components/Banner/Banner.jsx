import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import styles from "./Banner.module.css";

const slides = [
  {
    id: 1,
    tag: "OFERTA ESPECIAL",
    titulo: "Tecnología al mejor precio",
    subtitulo:
      "Hasta 30% OFF en auriculares, relojes y accesorios de última generación.",
    botonTexto: "Ver Tecnología",
    enlace: "/categoria/tecnologia",
    imagen: "https://picsum.photos/seed/banner1/1200/500",
  },
  {
    id: 2,
    tag: "NUEVA TEMPORADA",
    titulo: "Nueva colección de indumentaria",
    subtitulo:
      "Prendas y calzado diseñados para tu día a día con el mejor confort.",
    botonTexto: "Explorar Colección",
    enlace: "/categoria/indumentaria",
    imagen: "https://picsum.photos/seed/banner2/1200/500",
  },
  {
    id: 3,
    tag: "FINANCIACIÓN EXCLUSIVA",
    titulo: "3 cuotas sin interés",
    subtitulo:
      "Aprovecha y equipate hoy con envíos a todo el territorio nacional.",
    botonTexto: "Comprar Ahora",
    enlace: "/categoria/accesorios",
    imagen: "https://picsum.photos/seed/banner3/1200/500",
  },
];

function Banner() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  const anterior = () =>
    setActual((prev) => (prev - 1 + slides.length) % slides.length);
  const siguiente = () => setActual((prev) => (prev + 1) % slides.length);

  const slide = slides[actual];

  return (
    <div className={styles.carrusel}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className={styles.slide}
          style={{ backgroundImage: `url(${slide.imagen})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.oscurecido} />

          <div className={styles.contenidoWrapper}>
            <motion.div
              className={styles.tarjeta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className={styles.tag}>{slide.tag}</span>
              <h2 className={styles.titulo}>{slide.titulo}</h2>
              <p className={styles.subtitulo}>{slide.subtitulo}</p>
              <Link to={slide.enlace} className={styles.botonCta}>
                <span>{slide.botonTexto}</span>
                <FiArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className={`${styles.flecha} ${styles.flechaIzq}`}
        onClick={anterior}
        aria-label="Slide anterior"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        className={`${styles.flecha} ${styles.flechaDer}`}
        onClick={siguiente}
        aria-label="Siguiente slide"
      >
        <FiChevronRight size={24} />
      </button>

      <div className={styles.puntos}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.puntoBoton} ${index === actual ? styles.puntoBotonActivo : ""}`}
            onClick={() => setActual(index)}
            aria-label={`Ir al slide ${index + 1}`}
          >
            <span className={styles.puntoVisual} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Banner;
