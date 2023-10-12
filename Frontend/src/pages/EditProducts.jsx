import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProducts = () => {
  const [product, setProduct] = useState({
    Nombre: "",
    Price: "",
    Categorie: "",
    Url: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.pathname.split("/")[2];
  console.log(productId)

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProducto({ ...producto, [name]: value });
//   };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/productos/" + productId, product);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(product);
  return (
    <div className="login-container">
      <h2>Actualizar Producto</h2>
      <form className="login-form" action="">

      <input
        type="text"
        placeholder="Nombre"
        onChange={handleChange}
        name="Nombre"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="Price"
      />
      <input
        type="text"
        placeholder="Categorie"
        onChange={handleChange}
        name="Categorie"
      />
      <input
        type="text"
        placeholder="Url"
        onChange={handleChange}
        name="Url"
      />
      <button className="formButton" onClick={handleClick}>
        Actualizar
      </button>
      </form>
    </div>
  );
};

export default EditProducts;
