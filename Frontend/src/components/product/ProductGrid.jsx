import React from "react";
import useCart from "../../store/useProducts";
import useUserLogin from "../../store/useUserLogin";
import { Link } from "react-router-dom";
import "./style.css";

const ProductCard = ({ product }) => {
  const { addProduct } = useCart();
  const { user } = useUserLogin();
  console.log(user);
  const handleAddCart = () => {
    addProduct(product);
  };
  const renderActionButton = () => {
    if (user.isAdmin === true) {
      // Usuario admin, mostrar el botón de editar
      return (
       <Link to={`/editar/${product.id}`}>      
       <button>Editar</button>
       </Link> 
      )
    } else {
      // Usuario cliente, mostrar el botón de agregar al carrito
      return <button onClick={handleAddCart}>Agregar al carrito</button>;
    }
  };
  return (
    <div className="card">
      <img alt={product.Url} src={product.Url} />
      <h2>{product.Nombre}</h2>
      <p>Price: ${product.Price}</p>
      <p>Categoria: {product.Categorie}</p>
      {renderActionButton()} {/* Renderizar el botón correspondiente */}
      {/* <button onClick={handleAddCart}>Agregar al carrito</button> */}
    </div>
  );
};
const ProductGrid = ({ products }) => {
  return (
    <div className="product-card-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;