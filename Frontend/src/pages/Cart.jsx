import { Link } from "react-router-dom";
import useCart from "../store/useProducts";

const Cart = () => {
    const { cart, clearCart } = useCart();
    return (
      <div>
        <h1>Carrito de Compras</h1>
        <button onClick={() => clearCart()}>Limpiar carrito</button>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              Id: {product.id}, Nombre: {product.Nombre}, Cantidad:{" "}
              {product.cantidad}
            </li>
          ))}
        </ul>
        <Link to={"/comprar"}>COMPRAR</Link>
      </div>
    );
  };
  export default Cart;