/**
 * Servicio para subir imágenes a la API de ImgBB (https://api.imgbb.com/)
 */

const IMGBB_API_URL = "https://api.imgbb.com/1/upload";
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Valida un archivo antes de subirlo
 * @param {File} file - Archivo seleccionado por el usuario
 */
export function validateImageFile(file) {
  if (!file) {
    throw new Error("No se ha seleccionado ningún archivo");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado debe ser una imagen (JPG, PNG, WebP, etc.)");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`La imagen supera el tamaño máximo permitido de ${MAX_FILE_SIZE_MB}MB`);
  }

  return true;
}

/**
 * Sube una imagen a ImgBB y retorna la URL pública
 * @param {File} file - Archivo de imagen a subir
 * @returns {Promise<{ url: string, displayUrl: string, deleteUrl: string }>}
 */
export async function uploadImageToImgBB(file) {
  validateImageFile(file);

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey || apiKey === "tu_api_key_aqui") {
    throw new Error(
      "No se ha configurado la VITE_IMGBB_API_KEY en el archivo .env. Por favor ingresa tu API Key de https://api.imgbb.com/"
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${IMGBB_API_URL}?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      const errorMsg = data?.error?.message || "Ocurrió un error al subir la imagen a ImgBB";
      throw new Error(errorMsg);
    }

    return {
      url: data.data.url,
      displayUrl: data.data.display_url,
      deleteUrl: data.data.delete_url,
    };
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Error de conexión al intentar comunicarse con ImgBB");
    }
    throw error;
  }
}
