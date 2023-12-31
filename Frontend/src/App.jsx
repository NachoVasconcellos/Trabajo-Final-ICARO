import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import CreateProduct from "./pages/CreateProducts";
import EditProducts from "./pages/EditProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comprar" element={<Orders />} />
        <Route path="/crear" element={<CreateProduct />} />
        <Route path="/editar/:id" element={<EditProducts />} /> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;
