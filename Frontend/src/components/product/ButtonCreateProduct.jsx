import React from "react";
import useUserLogin from "../../store/useUserLogin";
import { useNavigate } from "react-router-dom";

const ButtonCreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useUserLogin();

  if (user.isAdmin) { // Cambiar la comparación a un booleano
    return (
      <div className="divSearch">
        <button onClick={() => navigate("/crear")}>Crear producto</button>
      </div>
    );
  } else {
    return null; // Opcionalmente, puedes retornar `null` si no cumple con la condición
  }
};

export default ButtonCreateProduct;
