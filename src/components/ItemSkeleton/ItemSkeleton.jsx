import styles from "./ItemSkeleton.module.css";

function ItemSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.imagenSkeleton} />
      <div className={styles.infoSkeleton}>
        <div className={styles.tagSkeleton} />
        <div className={styles.tituloSkeleton} />
        <div className={styles.precioSkeleton} />
        <div className={styles.botonSkeleton} />
      </div>
    </div>
  );
}

export default ItemSkeleton;
