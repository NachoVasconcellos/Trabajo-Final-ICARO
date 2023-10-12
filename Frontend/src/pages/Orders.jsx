// const Orders = () => {
//   return (
//     <div>Orders</div>
//   )
// }

// export default Orders

// import React from 'react';
// import useCart from '../store/useProducts'; // Importa tu hook useCart aquí
// import useUserLogin from '../store/useUserLogin'; // Importa tu hook useUserLogin aquí

// const Orders = () => {
//   const { cart } = useCart(); // Obtiene el carrito del hook useCart
//   const { user } = useUserLogin(); // Obtiene la información del usuario del hook useUserLogin

//   // Función para manejar la confirmación de la orden

//   return (
    //     <div>
//       <h1>Carrito de Compras</h1>
//       <div>
//         {/* Mostrar la información del usuario en un h2 */}
//         <h2>Información del Usuario</h2>
//         <p>Nombre: {user.Nombre}</p>
//         {/* Incluye otros campos del usuario (email, dirección, etc.) aquí si es necesario */}
//       </div>
//         <button onClick={handleOrderConfirmation}>Confirmar Compra</button>
//       {/* Resto del código para mostrar productos en el carrito y el botón de confirmación */}
//     </div>
//   );
// };

// export default Orders;

// SEGUNDO INTENTO

// import useCart from '../store/useProducts'; // Importa el estado global del carrito
// import useUserLogin from '../store/useUserLogin';
// function ConfirmarOrden() {
//     const { cart } = useCart(); // Obtiene el carrito desde el estado global
//     const { user } = useUserLogin(); // Obtiene los datos del usuario

      

//     // const handleOrderConfirmation = () => {
//     //   // Realiza la lógica de procesamiento de la orden aquí
//     //   // Esto podría incluir la validación de productos, cálculo del total, etc.
//     //   // Luego, puedes mostrar un mensaje de confirmación al usuario
//     //   console.log('Usuario:', user);
//     //   console.log('Productos en el carrito:', cart);
//     // };



//   // Calcula el precio total de la orden
//   const totalPrice = cart.reduce((total, product) => {
//     return total + product.Price * product.cantidad;
//   }, 0);

//   const handleOrderConfirmation = async () => {

//       console.log('Usuario:', user);
//       console.log('Productos en el carrito:', cart);

//     const orderData = {
//       user_id: user.Id, // Asegúrate de tener el ID del usuario en tu estado
//       total_price: totalPrice,
//       // Otras propiedades de la orden, como tipo de envío y dirección de envío
//       shipping_type: "retiro por el local", // Ajusta según la opción seleccionada por el usuario
//       shipping_address: "Dirección de envío", // Reemplaza con la dirección de envío ingresada por el usuario
//     };
//     try {
//       const response = await fetch("/api/ordenes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });
//       if (response.ok) {
//         alert("Orden Creada con exito")
//         // La orden se creó con éxito, puedes redirigir al usuario a una página de confirmación
//         // o realizar otras acciones necesarias
//         const emptyCart = [];
//         useCart.setCart(emptyCart); // Ajusta esto según cómo actualizas el carrito en tu estado global
//       } else {
//         // Manejar el caso en el que hubo un error al crear la orden
//         console.error("Error al crear la orden")
//       }
//     } catch (error) {
//       console.error("Error al procesar la orden:", error);
//     }
//   };

  

//   return (
//     <div>
//       <h1>Confirmar Orden de Compra</h1>
//       <h2>Detalles de la Orden:</h2>
//       <ul>
//         {cart.map((product) => (
//           <li key={product.id}>
//             {product.Nombre} - ({product.cantidad} x ${product.Price})
//           </li>
//         ))}
//       </ul>
//       <p>Precio Total: ${totalPrice}</p>
//       <h2>Datos de Contacto del Usuario:</h2>
//       <p>Nombre: {user.Name} {user.Surname}</p>
//       <p>Email: {user.Email}</p>
//       <p>Teléfono: {user.Telephone}</p>
//       <p>Dirección: {user.Address}</p>
//       <h2>Datos de Contacto Nuestros:</h2>
//       <p>Correo de contacto: contacto@tucomercio.com</p>
//       <p>Teléfono de contacto: +549123456789</p>
//       <h2>Opciones de Envío:</h2>
//       <label>
//         <input type="radio" name="shippingType" value="retiro" /> Retiro por el local
//       </label>
//       <label>
//         <input type="radio" name="shippingType" value="domicilio" /> Envío a domicilio
//       </label>
//       <h2>En caso de envio, ingrese su direccion:</h2>
//       <input type="text" />
//       {/* <p>Direccion de envio: {user.Address}</p> */}
//       {/* Aquí debes agregar campos para la dirección de envío si el usuario selecciona "Envío a domicilio" */}
//       <button onClick={handleOrderConfirmation}>Confirmar Compra</button>
//     </div>
//   );
// }
// export default ConfirmarOrden;

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