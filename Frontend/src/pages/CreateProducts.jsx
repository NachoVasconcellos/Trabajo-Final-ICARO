import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
function Create() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [producto, setProducto] = useState({
    Nombre: "",
    Price: "",
    Categorie: "",
    Url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      if (!response.ok) {
        setProducto(false);
        return setError(true);
      }
      const data = await response.json();
      setProducto(data);
      navigate("/");
    } catch (error) {
      console.log({ error });
      setError(true);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="login-container">
      <h2>Crear Producto</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            value={producto.Nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Price:</label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={producto.Price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Categorie:</label>
          <input
            type="text"
            id="Categorie"
            name="Categorie"
            value={producto.Categorie}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Url:</label>
          <input
            type="text"
            id="Url"
            name="Url"
            value={producto.Url}
            onChange={handleChange}
          />
        </div>
        {error && <div>Error al cargar el usuario.</div>}
        <button type="submit">Crear Producto</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
export default Create;