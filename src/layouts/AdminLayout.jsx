import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiExternalLink,
  FiShield,
  FiBarChart2,
} from "react-icons/fi";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const linkClass = ({ isActive }) =>
    isActive
      ? `${styles.sidebarLink} ${styles.sidebarActivo}`
      : styles.sidebarLink;

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.adminBadge}>
            <FiShield size={18} />
            <span>Panel Admin</span>
          </div>
          <Link to="/" className={styles.brandTitle}>
            MiEcommerce
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          <NavLink to="/admin" end className={linkClass}>
            <FiBarChart2 size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/productos" className={linkClass}>
            <FiBox size={18} />
            <span>Productos</span>
          </NavLink>
          <NavLink to="/admin/pedidos" className={linkClass}>
            <FiShoppingBag size={18} />
            <span>Pedidos</span>
          </NavLink>
          <NavLink to="/admin/clientes" className={linkClass}>
            <FiUsers size={18} />
            <span>Clientes</span>
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.btnVolverTienda}>
            <FiExternalLink size={16} />
            <span>Ir a la tienda</span>
          </Link>
        </div>
      </aside>

      <div className={styles.adminMainArea}>
        <header className={styles.adminTopHeader}>
          <div className={styles.topInfo}>
            <h2>Panel de Control</h2>
            <p>Gestiona tu catálogo, ventas y métricas en tiempo real</p>
          </div>
          <div className={styles.adminUsuarioBadge}>
            <span className={styles.avatarPunto} />
            <span>admin@miecommerce.com</span>
          </div>
        </header>

        <main className={styles.adminContenido}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
