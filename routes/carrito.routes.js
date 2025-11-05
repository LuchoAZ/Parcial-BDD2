import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { obtenerCarrito, totalCarrito, agregarAlCarrito, quitarDelCarrito } from "../controllers/carrito.controller.js";

const router = Router();

router.get("/:usuarioId", requireAuth, obtenerCarrito);
router.get("/:usuarioId/total", requireAuth, totalCarrito);
router.post("/:usuarioId/add", requireAuth, agregarAlCarrito);
router.post("/:usuarioId/remove", requireAuth, quitarDelCarrito);

export default router;
