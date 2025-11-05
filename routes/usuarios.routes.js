import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { listarUsuarios, detalleUsuario, crearUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), listarUsuarios);
router.get("/:id", requireAuth, detalleUsuario);
router.post("/", crearUsuario);
router.delete("/:id", requireAuth, requireRole("admin"), eliminarUsuario);

export default router;
