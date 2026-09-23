import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { getCurrentUser, logoutUser } from "../../services/authService.js";
import toast from "react-hot-toast";
import styles from "./UserDropdown.module.css";

function UserDropdown() {
  const [abierto, setAbierto] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getCurrentUser());
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAbierto(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAbierto(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCerrarSesion = () => {
    logoutUser();
    setAbierto(false);
    toast.success("Has cerrado sesión correctamente");
    navigate("/");
  };

  return (
    <div
      className={styles.dropdownContainer}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setAbierto((prev) => !prev)}
        aria-label={currentUser ? `Menú de ${currentUser.nombre}` : "Mi Cuenta"}
        aria-expanded={abierto}
      >
        {currentUser?.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.nombre}
            className={styles.avatarNav}
          />
        ) : (
          <FiUser size={21} className={styles.userIconNav} />
        )}
      </button>

      {abierto && (
        <div className={styles.menuFlotante} role="menu">
          {currentUser ? (
            <>
              <div className={styles.headerDropdown}>
                <h4 className={styles.titulo}>Hola, {currentUser.nombre}</h4>
              </div>
              <div className={styles.opcionesLista}>
                <Link
                  to="/perfil"
                  className={styles.itemOpcion}
                  onClick={() => setAbierto(false)}
                >
                  <FiUser size={18} className={styles.icono} />
                  <span>Mi Perfil</span>
                </Link>
                <div className={styles.separador} />
                <button
                  type="button"
                  className={styles.itemOpcion}
                  onClick={handleCerrarSesion}
                >
                  <FiLogOut size={18} className={styles.icono} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.headerDropdown}>
                <h4 className={styles.titulo}>Mi Cuenta</h4>
              </div>
              <div className={styles.opcionesLista}>
                <Link
                  to="/login"
                  className={styles.itemOpcion}
                  onClick={() => setAbierto(false)}
                >
                  <FiLogIn size={18} className={styles.icono} />
                  <span>Iniciar Sesión</span>
                </Link>
                <Link
                  to="/registro"
                  className={styles.itemOpcion}
                  onClick={() => setAbierto(false)}
                >
                  <FiUserPlus size={18} className={styles.icono} />
                  <span>Registrarse</span>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
