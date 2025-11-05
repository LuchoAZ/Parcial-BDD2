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
    const { id } = req.params;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === id;

    if (!esAdmin && !esDuenio)
      return res.status(403).json({ success: false, error: "No autorizado" });

    const usuario = await User.findById(id).select("-password");
    if (!usuario)
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });

    res.json({ success: true, data: usuario });
  } catch (err) {
    next(err);
  }
};

// Crear nuevo usuario
export const crearUsuario = async (req, res, next) => {
  try {
    const creado = await User.create(req.body);
    res.status(201).json({ success: true, data: { id: creado._id } });
  } catch (err) {
    next(err);
  }
};

// Eliminar usuario y su carrito asociado
export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ⚠️ Asegurarse de usar el campo correcto según el modelo (probablemente "user")
    await Cart.findOneAndDelete({ user: id });
    await User.findByIdAndDelete(id);

    res.json({ success: true, message: "Usuario y carrito eliminados" });
  } catch (err) {
    next(err);
  }
};
