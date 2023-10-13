import { Link } from "react-router-dom";
import useCart from "../store/useProducts";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, product) => {
    return total + product.Price * product.cantidad;
  }, 0);
  return (
    <>
      <Navbar />
      <div className="cartContent">
        <h1>Carrito de Compras</h1>
        <button className="button" onClick={() => clearCart()}>
          Limpiar carrito
        </button>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.Nombre}, Cantidad: {product.cantidad}, Precio: $
              {product.Price}
            </li>
          ))}
        </ul>
        <p>Precio Total: ${totalPrice}</p>
        <Link className="button" to={"/comprar"}>
          Comprar
        </Link>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
