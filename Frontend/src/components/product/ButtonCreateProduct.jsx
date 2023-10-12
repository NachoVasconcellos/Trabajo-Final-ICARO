import React from "react";
import useUserLogin from "../../store/useUserLogin";
import { useNavigate } from "react-router-dom";

const ButtonCreateProduct = () => {
    const renderActionButton = () => {

        const navigate = useNavigate();
        const { user } = useUserLogin();

        if (user.rol === "admin") {

            return <button onClick={() => navigate("/crear")}>Crear producto</button>

        }

    };


    return (
        <div>

            {renderActionButton()}

        </div>
    );
};

export default ButtonCreateProduct;