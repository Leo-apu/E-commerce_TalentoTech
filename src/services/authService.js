import mockUsuarios from "../data/usuarios.json";

const STORAGE_KEY_USER = "currentUser";
const STORAGE_KEY_USERS = "usuariosRegistrados";

// Obtiene la lista combinada de usuarios (mock + registrados en localStorage)
function getAllUsers() {
  try {
    const registrados =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    // Evitar duplicados por email
    const map = new Map();
    mockUsuarios.forEach((u) => map.set(u.email.toLowerCase(), u));
    registrados.forEach((u) => map.set(u.email.toLowerCase(), u));
    return Array.from(map.values());
  } catch {
    return mockUsuarios;
  }
}

// Autentica un usuario comparando con usuarios.json y usuarios locales
export async function loginUser(email, password) {
  // Simular pequeña latencia de red realista
  await new Promise((resolve) => setTimeout(resolve, 350));

  const users = getAllUsers();
  const usuarioEncontrado = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!usuarioEncontrado) {
    throw new Error(
      "No existe una cuenta registrada con este correo electrónico",
    );
  }

  if (usuarioEncontrado.password !== password) {
    throw new Error("Contraseña incorrecta. Por favor verifica tus datos");
  }

  // Guardar en sesión
  const sesion = {
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre,
    email: usuarioEncontrado.email,
    telefono: usuarioEncontrado.telefono || "+54 11 1234-5678",
    dni: usuarioEncontrado.dni || "No registrado",
    direccion: usuarioEncontrado.direccion || {
      calle: "Sin registrar",
      ciudad: "Buenos Aires",
      provincia: "CABA",
      codigoPostal: "C1000",
    },
    rol: usuarioEncontrado.rol || "client",
    avatarUrl: usuarioEncontrado.avatar || usuarioEncontrado.avatarUrl,
  };

  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sesion));
  window.dispatchEvent(new Event("storage"));

  return sesion;
}

// Registra un nuevo usuario en localStorage y lo inicia como currentUser
export async function registerUser(nuevoUsuario) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const users = getAllUsers();
  const existe = users.some(
    (u) => u.email.toLowerCase() === nuevoUsuario.email.trim().toLowerCase(),
  );

  if (existe) {
    throw new Error(
      "Ya existe una cuenta registrada con ese correo electrónico",
    );
  }

  const usuarioFormateado = {
    id: `user_${Date.now()}`,
    nombre: nuevoUsuario.nombre.trim(),
    email: nuevoUsuario.email.trim().toLowerCase(),
    telefono: nuevoUsuario.telefono || "+54 11 9876-5432",
    dni: nuevoUsuario.dni || "No registrado",
    direccion: nuevoUsuario.direccion || {
      calle: "Av. Corrientes 4500",
      ciudad: "Buenos Aires",
      provincia: "CABA",
      codigoPostal: "C1195",
    },
    rol: "client",
    password: nuevoUsuario.password,
    avatar: nuevoUsuario.avatarUrl,
    avatarUrl: nuevoUsuario.avatarUrl,
  };

  const registrados = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
  registrados.push(usuarioFormateado);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registrados));

  // Iniciar sesión con el nuevo usuario
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(usuarioFormateado));
  window.dispatchEvent(new Event("storage"));

  return usuarioFormateado;
}

// Obtiene el usuario autenticado actualmente
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Cierra la sesión activa
export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY_USER);
  window.dispatchEvent(new Event("storage"));
}

// Actualiza los datos del usuario en sesión y en la lista de registrados
export function updateCurrentUser(nuevosDatos) {
  const actual = getCurrentUser();
  if (!actual) return null;

  const actualizado = { ...actual, ...nuevosDatos };
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(actualizado));

  try {
    const registrados =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
    const index = registrados.findIndex(
      (u) => u.id === actual.id || u.email === actual.email,
    );
    if (index > -1) {
      registrados[index] = { ...registrados[index], ...nuevosDatos };
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registrados));
    }
  } catch (e) {
    console.error("Error al sincronizar usuariosRegistrados:", e);
  }

  window.dispatchEvent(new Event("storage"));
  return actualizado;
}
