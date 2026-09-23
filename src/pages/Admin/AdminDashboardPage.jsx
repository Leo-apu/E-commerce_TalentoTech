import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiPlus,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "./AdminDashboardPage.module.css";

function AdminDashboardPage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data.slice(0, 6)))
      .catch(() => setProductos([]));
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.metricasGrid}>
        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}
          >
            <FiDollarSign size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Ventas del Mes</span>
            <strong className={styles.metricaValor}>$1.840.500</strong>
            <span className={styles.metricaTendencia}>
              <FiTrendingUp size={14} /> +18.2% vs mes anterior
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
          >
            <FiShoppingBag size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Pedidos Nuevos</span>
            <strong className={styles.metricaValor}>48 órdenes</strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#3b82f6" }}
            >
              6 pendientes de envío
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#fdf4ff", color: "#a855f7" }}
          >
            <FiUsers size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Clientes Activos</span>
            <strong className={styles.metricaValor}>342</strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#a855f7" }}
            >
              +14 esta semana
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#fff7ed", color: "#f97316" }}
          >
            <FiBox size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Productos Activos</span>
            <strong className={styles.metricaValor}>36 artículos</strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#f97316" }}
            >
              3 categorías
            </span>
          </div>
        </div>
      </div>
      <div className={styles.tablaCard}>
        <div className={styles.tablaHeader}>
          <div>
            <h3>Gestión de Catálogo</h3>
            <p>Lista de productos disponibles en la tienda</p>
          </div>
          <button
            className={styles.btnNuevo}
            onClick={() => alert("Modal para añadir producto")}
          >
            <FiPlus size={16} />
            <span>Nuevo Producto</span>
          </button>
        </div>

        <div className={styles.tablaWrapper}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td className={styles.colProducto}>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className={styles.prodImg}
                    />
                    <span className={styles.prodNombre}>{prod.nombre}</span>
                  </td>
                  <td>
                    <span className={styles.categoriaBadge}>
                      {prod.categoria}
                    </span>
                  </td>
                  <td>
                    <strong>${prod.precio.toLocaleString("es-AR")}</strong>
                  </td>
                  <td>
                    <span className={styles.estadoActivo}>En stock</span>
                  </td>
                  <td>
                    <button
                      className={styles.btnEditar}
                      onClick={() => alert(`Editar ${prod.nombre}`)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
