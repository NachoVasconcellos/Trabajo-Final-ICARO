import Footer from '../components/Footer/Footer';
import Navbar from '../components/NavBar/NavBar';
import useCart from '../store/useProducts'; // Importa el estado global del carrito
import useUserLogin from '../store/useUserLogin';
import { useState } from 'react'; // Importa useState para manejar el estado local

function ConfirmarOrden() {
  const { cart } = useCart(); // Obtiene el carrito desde el estado global
  const { user } = useUserLogin(); // Obtiene los datos del usuario

  const [orderData, setOrderData] = useState({
    user_id: user.Id,
    total_price: 0, // Esto se calculará más abajo
    shipping_type: "retiro por el local",
    shipping_address: "", // Campo para la dirección de envío
  });

  // Calcula el precio total de la orden
  const totalPrice = cart.reduce((total, product) => {
    return total + product.Price * product.cantidad;
  }, 0);

  const handleOrderConfirmation = async () => {
    if (orderData.shipping_type === "domicilio" && orderData.shipping_address === "") {
      // Validación: Se requiere una dirección de envío para el envío a domicilio
      alert("Por favor, ingrese una dirección de envío.");
      return;
    }

    orderData.total_price = totalPrice;

    try {
      const response = await fetch("/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Orden Creada con éxito");
        // La orden se creó con éxito, puedes redirigir al usuario a una página de confirmación
        // o realizar otras acciones necesarias
        const emptyCart = [];
        useCart.setCart(emptyCart); // Ajusta esto según cómo actualizas el carrito en tu estado global
      } else {
        // Manejar el caso en el que hubo un error al crear la orden
        console.error("Error al crear la orden");
      }
    } catch (error) {
      console.error("Error al procesar la orden:", error);
    }
  };

  return (

  <>
    <Navbar/>
    <div className='cartContent'>
      <h1>Confirmar Orden de Compra</h1>
      <h2>Detalles de la Orden:</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.Nombre} - ({product.cantidad} x ${product.Price})
          </li>
        ))}
      </ul>
      <p>Precio Total: ${totalPrice}</p>
      <h2>Datos de Contacto del Usuario:</h2>
      <p>Nombre: {user.Name} {user.Surname}</p>
      <p>Email: {user.Email}</p>
      <p>Teléfono: {user.Telephone}</p>
      <p>Dirección: {user.Address}</p>
      <h2>Datos de Contacto Nuestros:</h2>
      <p>Correo de contacto: contacto@tucomercio.com</p>
      <p>Teléfono de contacto: +549123456789</p>
      <h2>Opciones de Envío:</h2>
      <label>
        <input
          type="radio"
          name="shippingType"
          value="retiro"
          checked={orderData.shipping_type === "retiro por el local"}
          onChange={() => setOrderData({ ...orderData, shipping_type: "retiro por el local" })}
        /> Retiro por el local
      </label>
      <label>
        <input
          type="radio"
          name="shippingType"
          value="domicilio"
          checked={orderData.shipping_type === "domicilio"}
          onChange={() => setOrderData({ ...orderData, shipping_type: "domicilio" })}
        /> Envío a domicilio
      </label>
      <h2>En caso de envío, ingrese su dirección:</h2>
      <input
        className='inputOrder'
        type="text"
        placeholder="Dirección de envío"
        value={orderData.shipping_type === "domicilio" ? orderData.shipping_address : ""}
        onChange={(e) => {
          setOrderData({ ...orderData, shipping_address: e.target.value });
        }}
      />
      <button className='ButtonOrder' onClick={handleOrderConfirmation}>Confirmar Compra</button>
    </div>
    <Footer/>
  </>
  );
}

export default ConfirmarOrden;