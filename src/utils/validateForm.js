export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(values = {}) {
  const errors = {};
  const email = values.email?.trim() || "";
  const password = values.password || "";

  if (!email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email =
      "Ingresa un formato de correo válido (ej: usuario@ejemplo.com)";
  }

  if (!password) {
    errors.password = "La contraseña es requerida";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
}

export function validateRegisterForm(values = {}) {
  const errors = {};
  const nombre = values.nombre?.trim() || "";
  const email = values.email?.trim() || "";
  const password = values.password || "";
  const confirmPassword = values.confirmPassword || "";
  const avatarFile = values.avatarFile;

  // Nombre
  if (!nombre) {
    errors.nombre = "El nombre completo es requerido";
  } else if (nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  }

  // Email
  if (!email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Ingresa un correo electrónico válido";
  }

  // Contraseña
  if (!password) {
    errors.password = "La contraseña es requerida";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener mínimo 6 caracteres";
  }

  // Confirmar contraseña
  if (!confirmPassword) {
    errors.confirmPassword = "Debes confirmar tu contraseña";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  // Avatar / Foto de perfil (Opcional)
  if (avatarFile) {
    if (!avatarFile.type.startsWith("image/")) {
      errors.avatar = "El archivo debe ser una imagen (JPG, PNG o WebP)";
    } else if (avatarFile.size > 5 * 1024 * 1024) {
      errors.avatar = "La imagen no debe superar los 5MB de tamaño";
    }
  }

  return errors;
}
