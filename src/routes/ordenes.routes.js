import { Router } from "express";
import { requireAuth, isAdmin, isOwnerOrAdmin } from "../middlewares/auth.js";
import { crearOrden, listarOrdenes, ordenesPorUsuario, statsOrdenes, actualizarEstadoOrden, eliminarOrden } from "../controllers/ordenes.controller.js";

const OrdenesRouter = Router();

OrdenesRouter.post("/", requireAuth, crearOrden);
OrdenesRouter.get("/", requireAuth, isAdmin, listarOrdenes);
OrdenesRouter.get("/stats", requireAuth, isAdmin, statsOrdenes);
OrdenesRouter.get("/user/:usuarioId", requireAuth, isOwnerOrAdmin, ordenesPorUsuario);
OrdenesRouter.delete("/:orderId", requireAuth, eliminarOrden);
OrdenesRouter.patch("/:orderId/status", requireAuth, isAdmin, actualizarEstadoOrden);

export default OrdenesRouter;
