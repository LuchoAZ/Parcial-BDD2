import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { listarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria, statsCategorias } from "../controllers/categorias.controller.js";

const router = Router();

router.get("/", listarCategorias);
router.post("/", requireAuth, requireRole("admin"), crearCategoria);
router.put("/:id", requireAuth, requireRole("admin"), actualizarCategoria);
router.delete("/:id", requireAuth, requireRole("admin"), eliminarCategoria);
router.get("/stats", statsCategorias);

export default router;
