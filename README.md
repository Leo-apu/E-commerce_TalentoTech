# 🛍️ Mi Ecommerce - Tienda Online

Plataforma de comercio electrónico moderna, rápida y 100% responsiva desarrollada con el ecosistema de **React 18** y **Vite**. Cuenta con catálogo dinámico, paginación reactiva, sistema de autenticación de usuarios con roles, panel de perfil con subida de imágenes a la nube (ImgBB), lista de favoritos, panel de administración con métricas y carrito de compras con persistencia global.

Proyecto desarrollado para el curso de **Desarrollo Frontend con React** en **Talento Tech**.

**Autor:** Leandro Victorino Cruz  
**Tecnologías principales:** React 18, Vite, React Router DOM v7, Framer Motion, Context API, CSS Modules, React Paginate, React Hot Toast, React Icons, API ImgBB.

---

## 🚀 Despliegue en Vivo y Repositorio

* **Sitio Web (Deploy):** _[Pega aquí el enlace de tu sitio en Netlify o Vercel]_
* **Repositorio en GitHub:** _[Pega aquí el enlace a este repositorio]_

---

## 📌 Novedades y Funcionalidades del Sistema

### 1. 🔐 Sistema de Autenticación y Cuentas de Usuario (`authService.js`)
* **Gestión de Sesiones:** Autenticación simulada completa con persistencia en `localStorage` y sincronización en tiempo real entre pestañas y componentes mediante eventos de almacenamiento (`storage`).
* **Roles de Acceso:** Soporte para usuarios con rol `client` y rol `admin`.
* **Módulo de Validaciones (`validateForm.js`):**
  * Validación de correos electrónicos con expresiones regulares estandarizadas.
  * Requerimientos de longitud mínima de contraseñas y coincidencia de confirmación.
  * Validación estricta de archivos de imagen (formatos permitidos: JPG, PNG, WebP; tamaño máximo: 5 MB).
* **Componentes de Autenticación Dedicados:**
  * `LoginForm`: Formulario de acceso con opción de alternar visibilidad de contraseña (mostrar/ocultar), mensajes de error dinámicos y redirección inteligente al perfil.
  * `RegisterForm`: Formulario de registro con previsualización en tiempo real de avatar, opción de eliminar foto y subida automática a la nube.
  * `UserDropdown`: Menú flotante interactivo en el `Navbar` que detecta el estado de sesión: muestra la foto/avatar y nombre del usuario autenticado, enlaces rápidos a "Mi Perfil", "Cerrar Sesión" o botones para "Iniciar Sesión" y "Registrarse".

### 2. 👤 Perfil de Usuario Completo (`ProfilePage.jsx`)
* **Avatar Interactivo con la Nube:** Permite cambiar la foto de perfil en tiempo real seleccionando un archivo local que se sube automáticamente a **ImgBB** mediante `uploadImageToImgBB`, actualizando la sesión al instante.
* **Estructura por Pestañas:**
  * **Datos Personales:** Ficha con nombre completo, email, teléfono, DNI y rol de cuenta. Incluye modal interactivo para modificar los datos personales.
  * **Direcciones:** Vista de la dirección de entrega predeterminada (calle, ciudad, provincia, código postal) con modal para actualizar el domicilio de envío.
  * **Configuración:** Control de preferencias mediante switches interactivos para notificaciones (actualizaciones de pedidos, ofertas exclusivas, novedades del catálogo) y formulario para cambio seguro de contraseña.
  * **Mis Pedidos:** Historial de compras con acceso directo para explorar el catálogo si aún no se han registrado órdenes.

### 3. ☁️ Integración con API de ImgBB (`imgbbService.js`)
* Servicio desacoplado para la subida asíncrona de imágenes al servicio cloud de **ImgBB** (`https://api.imgbb.com/1/upload`).
* Envío multipart mediante `FormData` autenticado con API Key configurada a través de variables de entorno de Vite (`VITE_IMGBB_API_KEY`).
* Validación previa de tipo MIME y peso antes de realizar la petición HTTP para optimizar el ancho de banda y garantizar la estabilidad.

### 4. 📦 Catálogo de Productos y Paginación Reactiva
* **Paginación Avanzada con `react-paginate`:**
  * Catálogo dividido en páginas de **12 productos** cada una.
  * Controles de navegación *Anterior* / *Siguiente*, botones numéricos de página y scroll suave automático al inicio de la lista al cambiar de página.
  * **Preservación de Estado de Navegación:** Al ingresar a la vista detallada de un producto (`/producto/:id`) y regresar, la aplicación recuerda exactamente la página en la que se encontraba el usuario (`location.state`).
* **Filtrado Dinámico:** Navegación por categorías (`/categoria/tecnologia`, `/categoria/indumentaria`, `/categoria/accesorios`) mediante `useParams`.
* **Estados de Carga y Resiliencia:** Skeletons de carga con efecto *shimmer* (`ItemSkeleton`) y componentes de contingencia para resultados vacíos o errores de conexión con botón de reintento.

### 5. ❤️ Sistema de Favoritos
* Almacenamiento local persistente (`favorites`) para guardar artículos de interés haciendo clic en el icono de corazón en cada tarjeta o en el detalle.
* Badge numérico en el `Navbar` actualizado en tiempo real.
* Vista dedicada `/favoritos` con tarjetas animadas con Framer Motion, eliminación rápida y acción directa para transferir productos al carrito de compras.

### 6. 🛒 Carrito de Compras Dual (`CartContext.jsx`)
* **Estado Global Reactivo:** Contexto unificado que almacena artículos, cantidades, subtotales y total general con persistencia en `localStorage`.
* **CartWidget:** Indicador en la barra de navegación con contador de unidades.
* **CartDrawer:** Panel lateral deslizable para revisar compras rápidas sin abandonar la página actual, con barra de progreso interactiva hacia el beneficio de **Envío Gratis**.
* **Página Completa del Carrito (`/carrito`):** Desglose detallado de ítems, controles incrementales (+ / -), aviso de cuánto dinero resta para alcanzar el envío gratuito (a partir de $50.000), garantías de compra segura y botón de vaciado total.

### 7. 🛡️ Panel de Administración (`AdminLayout.jsx` & `AdminDashboardPage.jsx`)
* Layout independiente con barra lateral (*sidebar*) y encabezado con información de administrador.
* **Métricas en Vivo:** Tarjetas con resumen de ventas mensuales, nuevos pedidos con órdenes pendientes de despacho, clientes activos y cantidad de productos en catálogo.
* **Gestión de Catálogo:** Tabla con visualización de productos, categorías, precios formateados en moneda argentina (`$ ARS`), etiquetas de stock y botones de acción.
* **Subrutas Preparadas:** Rutas dedicadas para `/admin`, `/admin/productos`, `/admin/pedidos` y `/admin/clientes`.

### 8. ✨ Experiencia de Usuario, Animaciones y Microinteracciones
* **Framer Motion:** Animaciones de entrada escalonadas, microinteracciones en botones y transiciones suaves entre vistas (`PageTransition` con `AnimatePresence`).
* **React Hot Toast:** Sistema de alertas y notificaciones contextuales estilizadas (agregado a carrito, favoritos, actualización de perfil, cierre de sesión, etc.).
* **ScrollToTop:** Componente que restablece automáticamente el desplazamiento vertical a la parte superior en cada cambio de ruta.

---

## 🛠️ Tecnologías y Librerías Utilizadas

| Tecnología | Propósito |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Biblioteca principal para interfaces de usuario declarativas basadas en componentes |
| **[Vite 5](https://vitejs.dev/)** | Entorno de desarrollo ultrarrápido y empaquetador para producción |
| **[React Router DOM v7](https://reactrouter.com/)** | Enrutamiento declarativo del lado del cliente (SPA) con layouts anidados |
| **[React Paginate](https://github.com/AdeleD/react-paginate)** | Paginación interactiva y accesible de productos del catálogo |
| **[Framer Motion](https://www.framer.com/motion/)** | Animaciones fluidas, transiciones de página y microinteracciones |
| **[React Hot Toast](https://react-hot-toast.com/)** | Notificaciones flotantes y toasts de estado elegantes |
| **[React Icons](https://react-icons.github.io/react-icons/)** | Iconografía vectorial moderna basada en Feather Icons (`Fi`) y FontAwesome (`Fa`) |
| **[ImgBB API](https://api.imgbb.com/)** | Servicio en la nube para almacenamiento y hosting de imágenes de perfil y productos |
| **[CSS Modules](https://github.com/css-modules/css-modules)** | Estilos modulares encapsulados por componente, evitando colisiones de clases |

---

## 🗺️ Mapa de Rutas de la Aplicación

### Rutas de la Tienda (Cliente)
| Ruta | Descripción |
| :--- | :--- |
| `/` | Portada con Hero Banner, barra de beneficios, categorías destacadas y catálogo inicial |
| `/productos` | Catálogo completo con paginación interactiva (12 productos por página) |
| `/categoria/:categoria` | Catálogo filtrado por categoría (`tecnologia`, `indumentaria`, `accesorios`) |
| `/producto/:id` | Detalle del producto con selector de cantidad, cuotas, sellos de garantía y favoritos |
| `/carrito` | Página de resumen de compra, control de cantidades y progreso de envío gratis |
| `/favoritos` | Listado de productos guardados por el usuario con opción de compra rápida |
| `/login` | Formulario de inicio de sesión de usuarios con validaciones |
| `/registro` | Formulario de registro con subida de foto de perfil a ImgBB |
| `/perfil` | Panel de usuario con pestañas: Mis Pedidos, Datos Personales, Direcciones y Configuración |
| `*` | Página 404 personalizada para URLs inexistentes |

### Rutas del Panel de Control (Administración)
| Ruta | Descripción |
| :--- | :--- |
| `/admin` | Dashboard principal con métricas comerciales y tabla de catálogo |
| `/admin/productos` | Sección de administración de productos del catálogo |
| `/admin/pedidos` | Gestión y seguimiento de pedidos y órdenes de compra |
| `/admin/clientes` | Panel de clientes registrados |

---

## 📂 Estructura del Proyecto

```text
ecommerce/
├── public/
│   ├── productos.json             # Catálogo de productos local con precios y descripciones
│   └── usuarios.json              # Mock de usuarios de respaldo
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm/         # Formulario de inicio de sesión
│   │   │   └── RegisterForm/      # Formulario de registro con subida de foto
│   │   ├── Banner/                # Carrusel principal de promociones
│   │   ├── BeneficiosBar/         # Barra de ventajas comerciales (envíos, cuotas, garantía)
│   │   ├── CartDrawer/            # Panel lateral deslizante del carrito
│   │   ├── CartWidget/            # Widget del carrito con contador para el Navbar
│   │   ├── CategoriasDestacadas/  # Accesos directos a las categorías principales
│   │   ├── Footer/                # Pie de página, medios de pago y datos del equipo
│   │   ├── Header/                # Barra superior de anuncios
│   │   ├── Item/                  # Tarjeta individual de producto con precio y cuotas
│   │   ├── ItemDetail/            # Ficha técnica visual con selector de unidades y badges
│   │   ├── ItemList/              # Cuadrícula con paginación integrada (ReactPaginate)
│   │   ├── ItemSkeleton/          # Skeleton loader con animación shimmer
│   │   ├── Navbar/                # Barra de navegación principal y enlaces
│   │   ├── PageTransition/        # Envoltorio de animaciones entre rutas (Framer Motion)
│   │   ├── ScrollToTop/           # Reset de scroll automático al navegar
│   │   └── UserDropdown/          # Menú desplegable de usuario (perfil / logout / login)
│   ├── context/
│   │   └── CartContext.jsx        # Estado global del carrito (Context API + localStorage)
│   ├── data/
│   │   └── usuarios.json          # Datos de usuarios de prueba (Admin y Cliente)
│   ├── layouts/
│   │   ├── Layout.jsx             # Layout maestro de la tienda (Header, Navbar, Drawer, Footer)
│   │   └── AdminLayout.jsx        # Layout para el panel de administración con sidebar
│   ├── pages/
│   │   ├── Admin/                 # Dashboard y métricas administrativas
│   │   ├── Cart/                  # Vista completa del carrito de compras
│   │   ├── Favoritos/             # Vista de productos guardados
│   │   ├── Home/                  # Portada de la tienda
│   │   ├── ItemDetailContainer/   # Contenedor de la vista de detalle
│   │   ├── ItemListContainer/     # Contenedor de listado y filtrado por categoría
│   │   ├── Login/                 # Página de inicio de sesión
│   │   ├── NotFound/              # Página de error 404 personalizada
│   │   ├── Profile/               # Panel de perfil de usuario (datos, dirección, config)
│   │   └── Register/              # Página de registro con carga de avatar
│   ├── services/
│   │   ├── authService.js         # Lógica de autenticación, sesión y actualización de perfil
│   │   └── imgbbService.js        # Integración con la API de subida de imágenes de ImgBB
│   ├── utils/
│   │   └── validateForm.js        # Reglas de validación para formularios y archivos
│   ├── App.jsx                    # Configuración central de rutas y Providers
│   ├── index.css                  # Variables CSS, tokens de diseño y reset global
│   └── main.jsx                   # Punto de entrada de la aplicación
├── .env                           # Variables de entorno locales (Ignorado en git)
├── .env.example                   # Plantilla de variables de entorno requeridas
├── index.html                     # Plantilla HTML con tipografías y metadatos
├── package.json                   # Dependencias y scripts del proyecto
├── vite.config.js                 # Configuración del empaquetador Vite
└── README.md                      # Documentación completa del proyecto
```

---

## 🔑 Cuentas de Prueba (Credenciales Demo)

Para probar los diferentes roles y accesos sin necesidad de registrar un nuevo usuario:

| Rol | Correo Electrónico | Contraseña | Acceso |
| :--- | :--- | :--- | :--- |
| **Administrador** | `leandro@ejemplo.com` | `123456` | Perfil completo y acceso al panel `/admin` |
| **Cliente** | `sol@ejemplo.com` | `123456` | Compras, favoritos y personalización de perfil |

> 💡 *También puedes crear cualquier cuenta nueva desde `/registro` y opcionalmente subir tu propia foto de perfil.*

---

## 💻 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

### 2. Instalar dependencias
```bash
npm install
# o si utilizas pnpm:
pnpm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
```bash
cp .env.example .env
```
Edita `.env` con tu clave gratuita de [ImgBB API](https://api.imgbb.com/):
```env
VITE_IMGBB_API_KEY=tu_api_key_aqui
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
# o con pnpm:
pnpm dev
```
Abre en tu navegador la dirección indicada en la consola (por defecto: `http://localhost:5173`).

### 5. Compilación para producción
Para compilar y verificar el bundle optimizado para producción:
```bash
npm run build
```
Para previsualizar la compilación de producción localmente:
```bash
npm run preview
```

---

## 👨‍💻 Autor

* **Leandro Victorino Cruz**
* Curso: **Desarrollo Frontend con React** - *Talento Tech*

