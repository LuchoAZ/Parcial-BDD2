import { isAdmin, verifyToken } from "../middlewares/auth.js";
import User from "../models/User.js";
import express from "express";
const userRouter = express.Router();

userRouter.get("/",verifyToken, isAdmin,async (req, res) => {
  try {
    const autores = await User.find();
    res.status(200).json(autores);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error al obtener los usuarios: ${error.message}` });
  }
});

// Registro público
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "El email ya está en uso" });

    const newUser = await User.create({ name, email, password, role: "client" });
    res.status(201).json({ message: "Usuario creado correctamente", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear admin (solo si ya sos admin)
userRouter.post("/admin", verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = await User.create({ name, email, password, role: "admin" });
    res.status(201).json({ message: "Admin creado correctamente", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
