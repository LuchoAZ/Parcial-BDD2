import { Router } from "express";
import { requireAuth, isAdmin } from "../middlewares/auth.js";
import { listarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria, statsCategorias } from "../controllers/categorias.controller.js";

const CategoriasRouter = Router();

CategoriasRouter.get("/", listarCategorias);
CategoriasRouter.post("/", requireAuth, isAdmin, crearCategoria);
CategoriasRouter.put("/:id", requireAuth, isAdmin, actualizarCategoria);
CategoriasRouter.delete("/:id", requireAuth, isAdmin, eliminarCategoria);
CategoriasRouter.get("/stats", statsCategorias);

export default CategoriasRouter;
