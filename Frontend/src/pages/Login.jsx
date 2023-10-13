import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserLogin from "../store/useUserLogin";
import "./style.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setIsLogged, setUser } = useUserLogin();
  const navigate = useNavigate();

  const onFinish = async (event) => {
    event.preventDefault();
    const { Email, Password } = event.target.elements;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email.value,
          Password: Password.value,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        return setError(true);
      }

      const data = await response.json();
      setUser(data);
      setIsLogged(true);
      navigate("/");
    } catch (error) {
      console.log({ error });
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={onFinish}>
        <input
          type="email"
          name="Email"
          id="Email"
          placeholder="Ingrese su Email"
          required
        />
        <input
          type="text"
          name="Password"
          id="Password"
          placeholder="Ingrese su Contraseña"
          required
        />
        <div>
          {error && (
            <p style={{ color: "red" }}>
              Usuario o contraseña incorrectos. Por favor, intente de nuevo.
            </p>
          )}
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
