import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que vengan los campos
    if (!email || !password)
      return res.status(400).json({ error: "Email y password son requeridos" });

    // Buscar usuario y traer el password (select: false por defecto)
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({ error: "Usuario no encontrado" });

    // Comparar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
});

export default authRouter;
