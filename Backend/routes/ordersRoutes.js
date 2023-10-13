const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  listOrders,
} = require("../controllers/ordersControllers");

router.post("/", createOrder); // Crear una nueva orden
router.get("/:orderId", getOrder); // Obtener detalles de una orden específica
router.put("/:orderId", updateOrder); // Actualizar una orden existente
router.delete("/:orderId", deleteOrder); // Eliminar una orden existente
router.get("/", listOrders); // Listar todas las órdenes
module.exports = router;


