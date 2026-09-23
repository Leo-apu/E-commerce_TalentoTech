import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Item from "../Item/Item.jsx";
import styles from "./ItemList.module.css";
import { useLocation } from "react-router-dom";

const PRODUCTOS_POR_PAGINA = 12;

function ItemList({ productos }) {
  const location = useLocation();
  const paginaInicial = location.state?.pagina ?? 0;
  const [paginaActual, setPaginaActual] = useState(paginaInicial);
  const topRef = useRef(null);

  useEffect(() => {
    if (location.state?.pagina !== undefined) {
      setPaginaActual(location.state.pagina);
    } else {
      setPaginaActual(0);
    }
  }, [productos, location.state]);

  const inicio = paginaActual * PRODUCTOS_POR_PAGINA;
  const productosPagina = productos.slice(
    inicio,
    inicio + PRODUCTOS_POR_PAGINA,
  );
  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);

  const handlePageChange = (evento) => {
    setPaginaActual(evento.selected);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div ref={topRef} className={styles.grid}>
        {productosPagina.map((producto) => (
          <Item
            key={producto.id}
            producto={producto}
            paginaActual={paginaActual}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <ReactPaginate
          previousLabel={<FiChevronLeft size={18} />}
          nextLabel={<FiChevronRight size={18} />}
          pageCount={totalPaginas}
          forcePage={paginaActual}
          onPageChange={handlePageChange}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          containerClassName={styles.paginacion}
          pageClassName={styles.pagina}
          pageLinkClassName={styles.paginaLink}
          activeClassName={styles.paginaActiva}
          previousClassName={styles.pagina}
          nextClassName={styles.pagina}
          previousLinkClassName={`${styles.paginaLink} ${styles.paginaNav}`}
          nextLinkClassName={`${styles.paginaLink} ${styles.paginaNav}`}
          disabledClassName={styles.paginaDeshabilitada}
          breakClassName={styles.pagina}
          breakLinkClassName={styles.paginaLink}
        />
      )}
    </div>
  );
}

export default ItemList;
