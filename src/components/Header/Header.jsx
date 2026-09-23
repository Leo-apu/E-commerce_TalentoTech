import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.topbar}>
      <p className={styles.text}>
        ✨ <strong>Envío gratis</strong> en compras desde $50.000 &bull;{" "}
        <strong>3 cuotas sin interés</strong> en todos los productos
      </p>
    </div>
  );
}

export default Header;
