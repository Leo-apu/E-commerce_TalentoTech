import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHeart, FiUser, FiSettings } from "react-icons/fi";
import CartWidget from "../CartWidget/CartWidget.jsx";
import UserDropdown from "../UserDropdown/UserDropdown.jsx";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const actualizarDatos = () => {
      try {
        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavCount(favs.length);
      } catch {
        setFavCount(0);
      }

      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user || null);
      } catch {
        setCurrentUser(null);
      }
    };
    actualizarDatos();

    window.addEventListener("storage", actualizarDatos);
    return () => window.removeEventListener("storage", actualizarDatos);
  }, [location]);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.activo}` : styles.link;

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className={styles.navContainer}>
      <nav className={styles.navBar}>
        <button
          className={styles.hamburguesa}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          {menuAbierto ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link to="/" className={styles.logo} onClick={cerrarMenu}>
          <span className={styles.logoBadge}>Mi</span>Ecommerce
        </Link>

        <ul
          className={`${styles.list} ${menuAbierto ? styles.listAbierta : ""}`}
        >
          <li>
            <NavLink to="/" end className={linkClass} onClick={cerrarMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={linkClass} onClick={cerrarMenu}>
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categoria/tecnologia"
              className={linkClass}
              onClick={cerrarMenu}
            >
              Tecnología
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categoria/indumentaria"
              className={linkClass}
              onClick={cerrarMenu}
            >
              Indumentaria
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categoria/accesorios"
              className={linkClass}
              onClick={cerrarMenu}
            >
              Accesorios
            </NavLink>
          </li>
        </ul>

        <div className={styles.iconos}>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${styles.actionBtn} ${isActive ? styles.actionActivo : ""}`
            }
            title="Panel de Administración"
            aria-label="Panel de Administración"
            onClick={cerrarMenu}
          >
            <FiSettings size={19} />
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              `${styles.actionBtn} ${isActive ? styles.actionActivo : ""}`
            }
            aria-label="Ver favoritos"
            onClick={cerrarMenu}
          >
            <FiHeart size={20} />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>

          <UserDropdown />

          <CartWidget />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
