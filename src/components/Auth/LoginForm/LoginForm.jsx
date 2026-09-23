import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";
import styles from "./LoginForm.module.css";
import toast from "react-hot-toast";

function LoginForm({
  values,
  errors = {},
  isSubmitting = false,
  onChange,
  onSubmit,
}) {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {errors.general && (
        <div className={styles.alertaGeneral}>
          <FiAlertCircle
            size={18}
            style={{ flexShrink: 0, marginTop: "2px" }}
          />
          <span>{errors.general}</span>
        </div>
      )}
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="login-email">
          Correo Electrónico
        </label>
        <div className={styles.inputWrapper}>
          <FiMail className={styles.inputIcono} size={18} />
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={values.email}
            onChange={onChange}
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <p className={styles.errorTexto}>
            <FiAlertCircle size={13} /> {errors.email}
          </p>
        )}
      </div>
      <div className={styles.campo}>
        <div className={styles.labelFila}>
          <label className={styles.label} htmlFor="login-password">
            Contraseña
          </label>
          <a
            href="#"
            className={styles.olvideLink}
            onClick={(e) => {
              e.preventDefault();
              toast.error("Función de recuperación en desarrollo");
            }}
          >
            ¿La olvidaste?
          </a>
        </div>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcono} size={18} />
          <input
            id="login-password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            value={values.password}
            onChange={onChange}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setMostrarPassword((prev) => !prev)}
            aria-label={
              mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"
            }
          >
            {mostrarPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className={styles.errorTexto}>
            <FiAlertCircle size={13} /> {errors.password}
          </p>
        )}
      </div>
      <button type="submit" className={styles.boton} disabled={isSubmitting}>
        <span>
          {isSubmitting ? "Iniciando sesión..." : "Ingresar a mi cuenta"}
        </span>
        <FiArrowRight size={18} />
      </button>
    </form>
  );
}

export default LoginForm;
