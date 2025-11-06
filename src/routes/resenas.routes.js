import { Router } from "express";
import { isAdmin, requireAuth } from "../middlewares/auth.js";
import { listarResenas, resenasPorProducto, topResenas, crearResena, eliminarResena } from "../controllers/resenas.controller.js";

const ResenasRouter = Router();

ResenasRouter.get("/",requireAuth,isAdmin, listarResenas);
ResenasRouter.get("/product/:productId", resenasPorProducto);
ResenasRouter.get("/top",requireAuth,isAdmin, topResenas);
ResenasRouter.post("/", requireAuth, crearResena);
ResenasRouter.delete("/:id", requireAuth, eliminarResena);

export default ResenasRouter;
