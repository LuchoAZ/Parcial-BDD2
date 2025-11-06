import { Router } from "express";
import { isAdmin, isOwnerOrAdmin, requireAuth } from "../middlewares/auth.js";
import { listarUsuarios, detalleUsuario, eliminarUsuario, crearCliente, crearAdmin } from "../controllers/usuarios.controller.js";

const UsuariosRouter = Router();

UsuariosRouter.get("/", requireAuth, isAdmin, listarUsuarios);
UsuariosRouter.get("/:usuarioId", requireAuth,isOwnerOrAdmin, detalleUsuario);
UsuariosRouter.delete("/:usuarioId", requireAuth, isAdmin, eliminarUsuario);

UsuariosRouter.post("/register", crearCliente);
UsuariosRouter.post("/admin", requireAuth, isAdmin, crearAdmin );
export default UsuariosRouter;
