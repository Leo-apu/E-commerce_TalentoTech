import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import toast from "react-hot-toast";

import LoginForm from "../../components/Auth/LoginForm/LoginForm.jsx";
import { validateLoginForm } from "../../utils/validateForm.js";
import { loginUser, getCurrentUser } from "../../services/authService.js";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateLoginForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const usuarioLogueado = await loginUser(
        formData.email,
        formData.password,
      );
      toast.success(`¡Bienvenido de nuevo, ${usuarioLogueado.nombre}!`);
      navigate("/perfil");
    } catch (err) {
      setErrors({ general: err.message || "Error al iniciar sesión" });
      toast.error(err.message || "Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <FiUserCheck size={28} />
          </div>
          <h1 className={styles.titulo}>Iniciar sesión</h1>
          <p className={styles.subtitulo}>
            Accede a tus compras, favoritos y pedidos
          </p>
        </div>

        <LoginForm
          values={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <div className={styles.footerCard}>
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className={styles.registroLink}>
              Registrarme gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
