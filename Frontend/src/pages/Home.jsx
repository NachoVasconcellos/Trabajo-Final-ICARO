import React, { useEffect, useState } from "react";
import useCheckLogin from "../hooks/useCheckLogin";
import ProductGrid from "../components/product/ProductGrid";
import useUserLogin from "../store/useUserLogin";
import Navbar from "../components/NavBar/NavBar";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import ButtonCreateProduct from "../components/product/ButtonCreateProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUserLogin();
  useCheckLogin();

  useEffect(() => {
    console.log(user)
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
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filteredProducts);
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <Banner />

      <div className="divSearch">
        <input
          type="text"
          placeholder="Busca tu producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Buscar</button>
      </div>
      {user.isAdmin && <ButtonCreateProduct />}
      {/* {filteredProducts ? (
        <ProductGrid products={filteredProducts} isLogged={isLogged} />
      ) : null}
      {isLogged.rol === "admin" && <ButtonCreateProduct />} */}
      {filteredProducts ? <ProductGrid products={filteredProducts} /> : null}
      <Footer />
    </>
  );
};

export default Home;
