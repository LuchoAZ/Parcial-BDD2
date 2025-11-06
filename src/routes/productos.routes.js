import { Router } from "express";
import { requireAuth, isAdmin } from "../middlewares/auth.js";
import { listarProductos, filtroProductos, topProductos, crearProducto, actualizarProducto, eliminarProducto, actualizarStock } from "../controllers/productos.controller.js";

const ProductosRouter = Router();

ProductosRouter.get("/", listarProductos);
ProductosRouter.get("/filtro", filtroProductos);
ProductosRouter.get("/top", topProductos);
ProductosRouter.post("/", requireAuth, isAdmin, crearProducto);
ProductosRouter.put("/:id", requireAuth, isAdmin, actualizarProducto);
ProductosRouter.delete("/:id", requireAuth, isAdmin, eliminarProducto);
ProductosRouter.patch("/:id/stock", requireAuth, isAdmin, actualizarStock);

export default ProductosRouter;
