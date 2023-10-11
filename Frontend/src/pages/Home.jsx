import { useEffect, useState } from "react";
import useCheckLogin from "../hooks/useCheckLogin";
import ProductGrid from "../components/product/ProductGrid";
import useUserLogin from "../store/useUserLogin";
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
      <h1>React App</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts ? (
        <ProductGrid products={filteredProducts} isLogged={isLogged} />
      ) : null}
    </>
  );
}
export default Home;