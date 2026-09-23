import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm.jsx";
import { validateRegisterForm } from "../../utils/validateForm.js";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "../../services/imgbbService.js";
import { registerUser, getCurrentUser } from "../../services/authService.js";
import styles from "./RegisterPage.module.css";

/**
 * CONTENEDOR (Smart Component)
 * Contiene toda la lógica, estados, validaciones y llamadas a servicios.
 * Pasa los datos, errores y funciones como props al formulario de presentación.
 */
function RegisterPage() {
  const navigate = useNavigate();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estadoSubida, setEstadoSubida] = useState("");

  // Si ya tiene sesión activa, redirigir al perfil
  useEffect(() => {
    if (getCurrentUser()) {
      navigate("/perfil");
    }
  }, [navigate]);

  // Manejo de cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpia el error del campo al escribir
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: null, general: null }));
    }
  };

  // Manejo de la selección de foto
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));

      if (errors.avatar) {
        setErrors((prev) => ({ ...prev, avatar: null }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, avatar: err.message }));
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  // Quitar la foto seleccionada
  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  };

  // Envío y registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validar usando validateForm.js
    const formErrors = validateRegisterForm({
      ...formData,
      avatarFile,
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.nombre.trim(),
      )}&background=0f172a&color=fff`;

      // 2. Subir imagen a ImgBB solo si el usuario seleccionó un archivo
      if (avatarFile) {
        setEstadoSubida("Subiendo foto a ImgBB...");
        const imgRes = await uploadImageToImgBB(avatarFile);
        avatarUrl = imgRes.url;
      }

      // 3. Registrar usuario mediante el servicio
      setEstadoSubida("Creando tu cuenta...");
      const nuevoUsuario = await registerUser({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        avatarUrl: avatarUrl,
      });

      toast.success(`¡Registro exitoso! Bienvenido, ${nuevoUsuario.nombre}`);
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      setErrors({ general: err.message || "Error al completar el registro" });
      toast.error(err.message || "Error al completar el registro");
    } finally {
      setIsSubmitting(false);
      setEstadoSubida("");
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <FiUserPlus size={28} />
          </div>
          <h1 className={styles.titulo}>Crear una cuenta</h1>
          <p className={styles.subtitulo}>
            Regístrate para comprar y personalizar tu perfil
          </p>
        </div>

        <RegisterForm
          values={formData}
          errors={errors}
          avatarPreview={avatarPreview}
          isSubmitting={isSubmitting}
          estadoSubida={estadoSubida}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onRemoveAvatar={handleRemoveAvatar}
          onSubmit={handleSubmit}
        />

        <div className={styles.footerCard}>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.loginLink}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
