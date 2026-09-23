import { useState, useRef } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import styles from "./RegisterForm.module.css";

function RegisterForm({
  values,
  errors = {},
  avatarPreview,
  isSubmitting = false,
  estadoSubida = "",
  onChange,
  onFileChange,
  onRemoveAvatar,
  onSubmit,
}) {
  const fileInputRef = useRef(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

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
      <div className={styles.avatarSection}>
        <div
          className={`${styles.avatarContainer} ${
            errors.avatar ? styles.avatarContainerError : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
          title="Haz clic para seleccionar tu foto de perfil"
        >
          {avatarPreview ? (
            <>
              <img
                src={avatarPreview}
                alt="Vista previa de perfil"
                className={styles.avatarPreview}
              />
              <button
                type="button"
                className={styles.quitarAvatarBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                  onRemoveAvatar();
                }}
                title="Quitar foto"
                aria-label="Quitar foto"
              >
                <FiX size={14} />
              </button>
            </>
          ) : (
            <div className={styles.avatarPlaceholder}>
              <FiCamera size={26} />
              <span>Subir foto</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={onFileChange}
          id="avatar-input"
        />

        <span className={styles.avatarAyuda}>
          Foto de perfil (Opcional, máx 5MB)
        </span>

        {errors.avatar && (
          <p className={styles.errorTexto}>
            <FiAlertCircle size={13} /> {errors.avatar}
          </p>
        )}
      </div>
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="reg-nombre">
          Nombre Completo
        </label>
        <div className={styles.inputWrapper}>
          <FiUser className={styles.inputIcono} size={18} />
          <input
            id="reg-nombre"
            name="nombre"
            type="text"
            placeholder="Juan Pérez"
            className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
            value={values.nombre}
            onChange={onChange}
            autoComplete="name"
          />
        </div>
        {errors.nombre && (
          <p className={styles.errorTexto}>
            <FiAlertCircle size={13} /> {errors.nombre}
          </p>
        )}
      </div>
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="reg-email">
          Correo Electrónico
        </label>
        <div className={styles.inputWrapper}>
          <FiMail className={styles.inputIcono} size={18} />
          <input
            id="reg-email"
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
        <label className={styles.label} htmlFor="reg-password">
          Contraseña
        </label>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcono} size={18} />
          <input
            id="reg-password"
            name="password"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            value={values.password}
            onChange={onChange}
            autoComplete="new-password"
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
      <div className={styles.campo}>
        <label className={styles.label} htmlFor="reg-confirm-password">
          Confirmar Contraseña
        </label>
        <div className={styles.inputWrapper}>
          <FiLock className={styles.inputIcono} size={18} />
          <input
            id="reg-confirm-password"
            name="confirmPassword"
            type={mostrarConfirmPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            className={`${styles.input} ${
              errors.confirmPassword ? styles.inputError : ""
            }`}
            value={values.confirmPassword}
            onChange={onChange}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setMostrarConfirmPassword((prev) => !prev)}
            aria-label={
              mostrarConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"
            }
          >
            {mostrarConfirmPassword ? (
              <FiEyeOff size={16} />
            ) : (
              <FiEye size={16} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className={styles.errorTexto}>
            <FiAlertCircle size={13} /> {errors.confirmPassword}
          </p>
        )}
      </div>
      <button type="submit" className={styles.boton} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className={styles.spinner} />
            <span>{estadoSubida || "Procesando..."}</span>
          </>
        ) : (
          <>
            <FiCheckCircle size={18} />
            <span>Crear cuenta</span>
          </>
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
