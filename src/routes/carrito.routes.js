import { Router } from "express";
import { isOwnerOrAdmin, requireAuth } from "../middlewares/auth.js";
import { obtenerCarrito, totalCarrito, agregarAlCarrito, quitarDelCarrito } from "../controllers/carrito.controller.js";

const CarritoRouter = Router();

CarritoRouter.get("/:usuarioId", requireAuth,isOwnerOrAdmin, obtenerCarrito);
CarritoRouter.get("/:usuarioId/total", requireAuth,isOwnerOrAdmin, totalCarrito);
CarritoRouter.post("/:usuarioId/add", requireAuth,isOwnerOrAdmin, agregarAlCarrito);
CarritoRouter.delete("/:usuarioId/remove/:cartItemId", requireAuth,isOwnerOrAdmin, quitarDelCarrito);

export default CarritoRouter;
