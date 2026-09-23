import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import CartDrawer from "../components/CartDrawer/CartDrawer.jsx";

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
