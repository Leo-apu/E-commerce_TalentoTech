import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { FiShield, FiTruck, FiLock } from "react-icons/fi";
import styles from "./Footer.module.css";

const equipo = [
  {
    nombre: "Sol Guzman",
    rol: "Fundadora & CEO",
    avatar:
      "https://i.ibb.co/spNp61Nr/Whats-App-Image-sdfs2026-09-21-at-10-39-27.jpg",
    descripcion: "Estrategia y visión de producto.",
  },
  {
    nombre: "Leandro Cruz",
    rol: "Lead Developer",
    avatar:
      "https://i.ibb.co/27JvmkHT/Captura-de-pantalla-2025-05-03-021556.png",
    descripcion: "Arquitectura web y rendimiento.",
  },
  {
    nombre: "Valentina Gómez",
    rol: "Diseñadora UI/UX",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    descripcion: "Experiencia e interfaz de usuario.",
  },
];

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.trustBar}>
        <div className={styles.trustItem}>
          <FiTruck size={20} />
          <span>Envíos a todo el país</span>
        </div>
        <div className={styles.trustItem}>
          <FiLock size={20} />
          <span>Pago 100% encriptado y seguro</span>
        </div>
        <div className={styles.trustItem}>
          <FiShield size={20} />
          <span>Garantía en todas tus compras</span>
        </div>
      </div>

      <div className={styles.equipoSeccion}>
        <h4 className={styles.equipoTitulo}>Equipo de Desarrollo & Gestión</h4>
        <div className={styles.equipoGrid}>
          {equipo.map((persona, index) => (
            <div key={index} className={styles.personaCard}>
              <img
                src={persona.avatar}
                alt={persona.nombre}
                className={styles.personaAvatar}
              />
              <div className={styles.personaInfo}>
                <h5 className={styles.personaNombre}>{persona.nombre}</h5>
                <span className={styles.personaRol}>{persona.rol}</span>
                <p className={styles.personaDesc}>{persona.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contenido}>
        <div className={styles.columnaMarca}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoBadge}>Mi</span>Ecommerce
          </Link>
          <p className={styles.descripcion}>
            Tu tienda de confianza en tecnología, indumentaria y accesorios.
            Calidad garantizada y atención personalizada.
          </p>
          <div className={styles.redes}>
            <a href="#" aria-label="Instagram" className={styles.iconoRedes}>
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="WhatsApp" className={styles.iconoRedes}>
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div className={styles.columna}>
          <h4 className={styles.titulo}>Navegación</h4>
          <ul className={styles.lista}>
            <li>
              <Link to="/" className={styles.link}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/productos" className={styles.link}>
                Todos los Productos
              </Link>
            </li>
            <li>
              <Link to="/categoria/tecnologia" className={styles.link}>
                Tecnología
              </Link>
            </li>
            <li>
              <Link to="/categoria/indumentaria" className={styles.link}>
                Indumentaria
              </Link>
            </li>
            <li>
              <Link to="/categoria/accesorios" className={styles.link}>
                Accesorios
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.columna}>
          <h4 className={styles.titulo}>Ayuda & Soporte</h4>
          <ul className={styles.lista}>
            <li>
              <Link to="/carrito" className={styles.link}>
                Mi Carrito
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className={styles.link}>
                Mis Favoritos
              </Link>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Cambios y devoluciones
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.columna}>
          <h4 className={styles.titulo}>Contacto & Pagos</h4>
          <ul className={styles.lista}>
            <li className={styles.texto}>contacto@miecommerce.com</li>
            <li className={styles.texto}>Lun a Vie 9 a 18hs</li>
          </ul>
          <div className={styles.mediosPago}>
            <span className={styles.pagoBadge}>
              <FaCcVisa size={22} />
            </span>
            <span className={styles.pagoBadge}>
              <FaCcMastercard size={22} />
            </span>
            <span className={styles.pagoBadgeTexto}>MercadoPago</span>
          </div>
        </div>
      </div>

      <div className={styles.inferior}>
        <p className={styles.copyright}>
          © {anioActual} Mi Ecommerce &bull; Diseñado para la mejor experiencia
          de compra.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
