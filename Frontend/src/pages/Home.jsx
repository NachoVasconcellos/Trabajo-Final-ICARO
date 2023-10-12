import { useEffect, useState } from "react";
import useCheckLogin from "../hooks/useCheckLogin";
import ProductGrid from "../components/product/ProductGrid";
import useUserLogin from "../store/useUserLogin";
import Navbar from "../components/NavBar/NavBar";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLogged } = useUserLogin();
  useCheckLogin();
  useEffect(() => {
    fetch("/api/productos")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setFilteredProducts(data.data);
      });
  }, []);
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.Album.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchTerm]);
  return (
    <>
      <Navbar/>
      <Banner/>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts ? (
        <ProductGrid products={filteredProducts} isLogged={isLogged} />
      ) : null}
      <Footer/>
    </>
  );
}
export default Home;