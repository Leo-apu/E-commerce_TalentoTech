import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";

// Layouts
import Layout from "./layouts/Layout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Páginas
import HomePage from "./pages/Home/HomePage.jsx";
import ItemListContainer from "./pages/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./pages/ItemDetailContainer/ItemDetailContainer.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import Favoritos from "./pages/Favoritos/Favoritos.jsx";
import Login from "./pages/Login/Login.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import PageTransition from "./components/PageTransition/PageTransition.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#18181b",
            color: "#ffffff",
            fontSize: "0.88rem",
            fontWeight: 500,
            borderRadius: "10px",
            padding: "0.75rem 1.25rem",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#e63946", secondary: "#ffffff" },
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/productos"
              element={
                <PageTransition>
                  <ItemListContainer />
                </PageTransition>
              }
            />
            <Route
              path="/categoria/:categoria"
              element={
                <PageTransition>
                  <ItemListContainer />
                </PageTransition>
              }
            />
            <Route
              path="/producto/:id"
              element={
                <PageTransition>
                  <ItemDetailContainer />
                </PageTransition>
              }
            />
            <Route
              path="/carrito"
              element={
                <PageTransition>
                  <CartPage />
                </PageTransition>
              }
            />
            <Route
              path="/favoritos"
              element={
                <PageTransition>
                  <Favoritos />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/registro"
              element={
                <PageTransition>
                  <RegisterPage />
                </PageTransition>
              }
            />
            <Route
              path="/perfil"
              element={
                <PageTransition>
                  <ProfilePage />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFoundPage />
                </PageTransition>
              }
            />
          </Route>

          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <AdminDashboardPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <PageTransition>
                  <AdminDashboardPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin/pedidos"
              element={
                <PageTransition>
                  <AdminDashboardPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin/clientes"
              element={
                <PageTransition>
                  <AdminDashboardPage />
                </PageTransition>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </CartProvider>
  );
}

export default App;
