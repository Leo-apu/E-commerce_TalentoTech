import Banner from "../../components/Banner/Banner.jsx";
import BeneficiosBar from "../../components/BeneficiosBar/BeneficiosBar.jsx";
import CategoriasDestacadas from "../../components/CategoriasDestacadas/CategoriasDestacadas.jsx";
import ItemListContainer from "../ItemListContainer/ItemListContainer.jsx";

function HomePage() {
  return (
    <>
      <Banner />
      <BeneficiosBar />
      <CategoriasDestacadas />
      <ItemListContainer />
    </>
  );
}

export default HomePage;
