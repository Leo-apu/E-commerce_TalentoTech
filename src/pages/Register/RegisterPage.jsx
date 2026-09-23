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

function RegisterPage() {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (getCurrentUser()) {
      navigate("/perfil");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: null, general: null }));
    }
  };

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

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (avatarFile) {
        setEstadoSubida("Subiendo foto a ImgBB...");
        const imgRes = await uploadImageToImgBB(avatarFile);
        avatarUrl = imgRes.url;
      }

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
