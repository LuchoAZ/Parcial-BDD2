import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { listarProductos, filtroProductos, topProductos, crearProducto, actualizarProducto, eliminarProducto, actualizarStock } from "../controllers/productos.controller.js";

const router = Router();

router.get("/", listarProductos);
router.get("/filtro", filtroProductos);
router.get("/top", topProductos);
router.post("/", requireAuth, requireRole("admin"), crearProducto);
router.put("/:id", requireAuth, requireRole("admin"), actualizarProducto);
router.delete("/:id", requireAuth, requireRole("admin"), eliminarProducto);
router.patch("/:id/stock", requireAuth, requireRole("admin"), actualizarStock);

export default router;
