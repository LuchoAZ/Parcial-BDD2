import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { crearOrden, listarOrdenes, ordenesPorUsuario, statsOrdenes, actualizarEstadoOrden } from "../controllers/ordenes.controller.js";

const router = Router();

router.post("/", requireAuth, crearOrden);
router.get("/", requireAuth, requireRole("admin"), listarOrdenes);
router.get("/stats", requireAuth, requireRole("admin"), statsOrdenes);
router.get("/user/:userId", requireAuth, ordenesPorUsuario);
router.patch("/:id/status", requireAuth, requireRole("admin"), actualizarEstadoOrden);

export default router;
