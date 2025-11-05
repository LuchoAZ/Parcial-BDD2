import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { listarResenas, resenasPorProducto, topResenas, crearResena } from "../controllers/resenas.controller.js";

const router = Router();

router.get("/", listarResenas);
router.get("/product/:productId", resenasPorProducto);
router.get("/top", topResenas);
router.post("/", requireAuth, crearResena);

export default router;
