import express from "express";
import AuthRouter from "./routes/auth.routes.js";
import UsuariosRouter from "./routes/usuarios.routes.js";
import ProductosRouter from "./routes/productos.routes.js";
import CategoriasRouter from "./routes/categorias.routes.js";
import CarritoRouter from "./routes/carrito.routes.js";
import ResenasRouter from "./routes/resenas.routes.js";
import OrdenesRouter from "./routes/ordenes.routes.js";

const app = express();
app.use(express.json());

//Un log de las llamadas
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} '${req.originalUrl}'`);
  next();
});

//Aca van los router
app.use("/api/auth", AuthRouter);
app.use("/api/productos",ProductosRouter);
app.use("/api/categorias",CategoriasRouter);
app.use("/api/carrito",CarritoRouter);
app.use("/api/usuarios",UsuariosRouter);
app.use("/api/resenas",ResenasRouter);
app.use("/api/ordenes",OrdenesRouter);


//Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

//Middleware global para manejar los errores
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message || "Error interno del servidor",
  });
});

export default app;
