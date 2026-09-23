import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiSettings,
  FiEdit2,
  FiBell,
  FiLock,
  FiShoppingBag,
  FiX,
  FiCheck,
  FiCamera,
} from "react-icons/fi";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../../services/authService.js";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "../../services/imgbbService.js";
import toast from "react-hot-toast";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tabActiva, setTabActiva] = useState("datos");
  const [notifPedidos, setNotifPedidos] = useState(true);
  const [notifOfertas, setNotifOfertas] = useState(true);
  const [notifCatalogo, setNotifCatalogo] = useState(false);

  const [passActual, setPassActual] = useState("");
  const [passNueva, setPassNueva] = useState("");

  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalTipo, setModalTipo] = useState("datos");
  const [avatarSubiendo, setAvatarSubiendo] = useState(false);
  const avatarInputRef = useRef(null);

  const [formEditar, setFormEditar] = useState({
    nombre: "",
    telefono: "",
    dni: "",
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast("Por favor inicia sesión para acceder a tu perfil", { icon: "🔒" });
      navigate("/login");
    } else {
      setUsuario(user);
      setFormEditar({
        nombre: user.nombre || "",
        telefono: user.telefono || "+54 11 9876-5432",
        dni: user.dni || "No registrado",
        calle: user.direccion?.calle || "Av. Corrientes 4500",
        ciudad: user.direccion?.ciudad || "Buenos Aires",
        provincia: user.direccion?.provincia || "CABA",
        codigoPostal: user.direccion?.codigoPostal || "C1195",
      });
    }
  }, [navigate]);

  if (!usuario) return null;

  const abrirModalEditar = (tipo) => {
    setModalTipo(tipo);
    setModalEditarAbierto(true);
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    let nuevosDatos = {};

    if (modalTipo === "datos") {
      nuevosDatos = {
        nombre: formEditar.nombre,
        telefono: formEditar.telefono,
        dni: formEditar.dni,
      };
    } else {
      nuevosDatos = {
        direccion: {
          calle: formEditar.calle,
          ciudad: formEditar.ciudad,
          provincia: formEditar.provincia,
          codigoPostal: formEditar.codigoPostal,
        },
      };
    }

    const actualizado = updateCurrentUser(nuevosDatos);
    setUsuario(actualizado);
    setModalEditarAbierto(false);
    toast.success("Información actualizada correctamente");
  };

  const handleActualizarPassword = (e) => {
    e.preventDefault();
    if (!passNueva || passNueva.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }
    toast.success("Contraseña actualizada con éxito");
    setPassActual("");
    setPassNueva("");
  };

  const handleCambiarAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      setAvatarSubiendo(true);
      toast.loading("Subiendo foto a ImgBB...", { id: "avatar-upload" });

      const resImg = await uploadImageToImgBB(file);
      const userActualizado = updateCurrentUser({
        avatarUrl: resImg.url,
        avatar: resImg.url,
      });

      setUsuario(userActualizado);
      toast.success("¡Foto de perfil actualizada con éxito!", {
        id: "avatar-upload",
      });
    } catch (err) {
      toast.error(err.message || "Error al subir la imagen a ImgBB", {
        id: "avatar-upload",
      });
    } finally {
      setAvatarSubiendo(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.perfilHeader}>
        <div
          className={styles.avatarWrapper}
          onClick={() => !avatarSubiendo && avatarInputRef.current?.click()}
          title="Haz clic para cambiar tu foto de perfil"
        >
          {usuario.avatarUrl ? (
            <img
              src={usuario.avatarUrl}
              alt={usuario.nombre}
              className={styles.avatarGrande}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <FiUser size={40} />
            </div>
          )}

          {avatarSubiendo ? (
            <div className={styles.avatarSubiendoOverlay}>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              <span>Subiendo</span>
            </div>
          ) : (
            <>
              <div className={styles.avatarOverlay}>
                <FiCamera size={20} />
                <span>Cambiar</span>
              </div>
              <div className={styles.avatarCameraBadge}>
                <FiCamera size={13} />
              </div>
            </>
          )}

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleCambiarAvatar}
          />
        </div>

        <div className={styles.headerInfo}>
          <h1>{usuario.nombre}</h1>
          <p>{usuario.email}</p>
        </div>
      </div>

      <div className={styles.cuerpoLayout}>
        <aside className={styles.sidebarNav}>
          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "pedidos" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("pedidos")}
          >
            <FiPackage size={18} />
            <span>Mis Pedidos</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "datos" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("datos")}
          >
            <FiUser size={18} />
            <span>Datos Personales</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "direcciones" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("direcciones")}
          >
            <FiMapPin size={18} />
            <span>Direcciones</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "config" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("config")}
          >
            <FiSettings size={18} />
            <span>Configuración</span>
          </button>
        </aside>

        <main className={styles.tabContenidoCard}>
          {tabActiva === "datos" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Datos Personales</h2>
                <button
                  type="button"
                  className={styles.botonAccion}
                  onClick={() => abrirModalEditar("datos")}
                >
                  <FiEdit2 size={15} />
                  <span>Editar información</span>
                </button>
              </div>

              <div className={styles.datosGrid}>
                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Nombre Completo</span>
                  <span className={styles.datoValor}>{usuario.nombre}</span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Correo Electrónico</span>
                  <span className={styles.datoValor}>{usuario.email}</span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Teléfono</span>
                  <span className={styles.datoValor}>
                    {usuario.telefono || "+54 11 9876-5432"}
                  </span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>DNI / Identificación</span>
                  <span className={styles.datoValor}>
                    {usuario.dni || "No registrado"}
                  </span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Tipo de Cuenta</span>
                  <span className={styles.datoValor}>
                    {usuario.rol === "admin" ? "Administrador" : "Cliente"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tabActiva === "direcciones" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Mis Direcciones</h2>
                <button
                  type="button"
                  className={styles.botonAccion}
                  onClick={() => abrirModalEditar("direccion")}
                >
                  <FiEdit2 size={15} />
                  <span>Modificar dirección</span>
                </button>
              </div>

              <div className={styles.direccionCard}>
                <h3 className={styles.direccionTitulo}>
                  Dirección de entrega predeterminada
                </h3>
                <p className={styles.direccionTexto}>
                  {usuario.direccion?.calle || "Av. Corrientes 4500"}
                </p>
                <p className={styles.direccionTexto}>
                  {usuario.direccion?.ciudad || "Buenos Aires"},{" "}
                  {usuario.direccion?.provincia || "CABA"}
                </p>
                <p className={styles.direccionTexto}>
                  Código Postal: {usuario.direccion?.codigoPostal || "C1195"}
                </p>
              </div>
            </div>
          )}

          {tabActiva === "config" && (
            <div className={styles.configuracionContenedor}>
              <div className={styles.configuracionHeader}>
                <h2 className={styles.tabTitulo}>Configuración de Cuenta</h2>
                <p className={styles.configuracionSubtitulo}>
                  Personalizá tu experiencia, canales de comunicación y
                  preferencias de seguridad.
                </p>
              </div>

              <div className={styles.seccionCard}>
                <div className={styles.seccionCardHeader}>
                  <div className={styles.seccionIconoBadge}>
                    <FiBell size={22} />
                  </div>
                  <div className={styles.seccionTitulos}>
                    <h3>Notificaciones y Avisos</h3>
                    <p>Elegí qué alertas querés recibir en tiempo real.</p>
                  </div>
                </div>

                <div className={styles.togglesLista}>
                  <div className={styles.toggleFila}>
                    <div className={styles.toggleTextos}>
                      <h4>Actualizaciones de pedidos</h4>
                      <p>
                        Avisos de pago recibido, despacho y entrega inmediata.
                      </p>
                    </div>
                    <label className={styles.switchLabel}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={notifPedidos}
                        onChange={(e) => setNotifPedidos(e.target.checked)}
                      />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>

                  <div className={styles.toggleFila}>
                    <div className={styles.toggleTextos}>
                      <h4>Ofertas y promociones exclusivas</h4>
                      <p>
                        Descuentos de temporada, liquidaciones y cupones
                        especiales.
                      </p>
                    </div>
                    <label className={styles.switchLabel}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={notifOfertas}
                        onChange={(e) => setNotifOfertas(e.target.checked)}
                      />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>

                  <div className={styles.toggleFila}>
                    <div className={styles.toggleTextos}>
                      <h4>Novedades del catálogo</h4>
                      <p>
                        Lanzamiento de nuevas camisetas y reingreso de
                        indumentaria.
                      </p>
                    </div>
                    <label className={styles.switchLabel}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={notifCatalogo}
                        onChange={(e) => setNotifCatalogo(e.target.checked)}
                      />
                      <span className={styles.switchSlider} />
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.seccionCard}>
                <div className={styles.seccionCardHeader}>
                  <div className={styles.seccionIconoBadge}>
                    <FiLock size={22} />
                  </div>
                  <div className={styles.seccionTitulos}>
                    <h3>Seguridad y Contraseña</h3>
                    <p>
                      Mantené tu cuenta segura actualizando tu clave
                      periódicamente.
                    </p>
                  </div>
                </div>

                <form
                  className={styles.seguridadForm}
                  onSubmit={handleActualizarPassword}
                >
                  <div className={styles.seguridadCampo}>
                    <label htmlFor="pass-act">Contraseña actual</label>
                    <input
                      id="pass-act"
                      type="password"
                      placeholder="••••••••"
                      className={styles.seguridadInput}
                      value={passActual}
                      onChange={(e) => setPassActual(e.target.value)}
                    />
                  </div>

                  <div className={styles.seguridadCampo}>
                    <label htmlFor="pass-new">Nueva contraseña</label>
                    <input
                      id="pass-new"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      className={styles.seguridadInput}
                      value={passNueva}
                      onChange={(e) => setPassNueva(e.target.value)}
                    />
                  </div>

                  <button type="submit" className={styles.seguridadBoton}>
                    Actualizar contraseña
                  </button>
                </form>
              </div>
            </div>
          )}

          {tabActiva === "pedidos" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Mis Pedidos</h2>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "#64748b",
                }}
              >
                <FiPackage
                  size={48}
                  style={{ opacity: 0.4, marginBottom: "1rem" }}
                />
                <h3 style={{ margin: "0 0 0.5rem", color: "#1e293b" }}>
                  Aún no tienes pedidos registrados
                </h3>
                <p style={{ margin: "0 0 1.5rem", fontSize: "0.92rem" }}>
                  Cuando realices una compra, podrás realizar el seguimiento
                  aquí.
                </p>
                <Link
                  to="/productos"
                  className={styles.seguridadBoton}
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FiShoppingBag size={17} />
                  <span>Explorar productos</span>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      {modalEditarAbierto && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalEditarAbierto(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>
                {modalTipo === "datos"
                  ? "Editar Datos Personales"
                  : "Modificar Dirección"}
              </h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setModalEditarAbierto(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            <form
              onSubmit={handleGuardarEdicion}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {modalTipo === "datos" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.nombre}
                      onChange={(e) =>
                        setFormEditar({ ...formEditar, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.telefono}
                      onChange={(e) =>
                        setFormEditar({
                          ...formEditar,
                          telefono: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      DNI / Identificación
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.dni}
                      onChange={(e) =>
                        setFormEditar({ ...formEditar, dni: e.target.value })
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Calle y Número
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.calle}
                      onChange={(e) =>
                        setFormEditar({ ...formEditar, calle: e.target.value })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Ciudad
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.ciudad}
                      onChange={(e) =>
                        setFormEditar({ ...formEditar, ciudad: e.target.value })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Provincia
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.provincia}
                      onChange={(e) =>
                        setFormEditar({
                          ...formEditar,
                          provincia: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <label style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                      Código Postal
                    </label>
                    <input
                      type="text"
                      className={styles.seguridadInput}
                      style={{ maxWidth: "100%" }}
                      value={formEditar.codigoPostal}
                      onChange={(e) =>
                        setFormEditar({
                          ...formEditar,
                          codigoPostal: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  type="button"
                  className={styles.botonAccion}
                  onClick={() => setModalEditarAbierto(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.seguridadBoton}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <FiCheck size={16} />
                  <span>Guardar cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
