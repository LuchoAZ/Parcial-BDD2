import User from "../models/User.js";
import Cart from "../models/Cart.js";

// Listar todos los usuarios (sin contraseñas)
export const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await User.find().select("-password");
    res.json({ success: true, data: usuarios });
  } catch (err) {
    next(err);
  }
};

// Detalle de usuario por ID (solo admin o dueño)
export const detalleUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const usuario = await User.findById(usuarioId).select("-password");
    if (!usuario)
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });

    res.json({ success: true, data: usuario });
  } catch (err) {
    next(err);
  }
};

// Crear nuevo cliente
export const crearCliente = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "El email ya está en uso" });

    const newUser = await User.create({
      name,
      email,
      password,
      role: "client",
    });
    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// Crear nuevo admin
export const crearAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Admin creado correctamente",
        data: newAdmin,
      });
  } catch (err) {
    next(err);
  }
};

// Eliminar usuario y su carrito asociado
export const eliminarUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    await Cart.findOneAndDelete({ user: usuarioId });
    await User.findByIdAndDelete(usuarioId);

    res.json({ success: true, message: "Usuario y carrito eliminados" });
  } catch (err) {
    next(err);
  }
};
