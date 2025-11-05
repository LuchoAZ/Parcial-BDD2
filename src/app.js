import express from "express";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());

//Un log de las llamadas
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} '${req.originalUrl}'`);
  next();
});

//Aca van los router
app.use("/api/auth", authRouter);
app.use("/api/users",userRouter);


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
