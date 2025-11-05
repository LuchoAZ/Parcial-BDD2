import Usuario from "../models/Usuario.js";
import Carrito from "../models/Carrito.js";

export const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().select("-password");
    res.json({ success: true, data: usuarios });
  } catch (err) { next(err); }
};

export const detalleUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === id;
    if (!esAdmin && !esDuenio) return res.status(403).json({ success:false, error:"No autorizado" });

    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) return res.status(404).json({ success:false, error:"Usuario no encontrado" });
    res.json({ success: true, data: usuario });
  } catch (err) { next(err); }
};

export const crearUsuario = async (req, res, next) => {
  try {
    const creado = await Usuario.create(req.body);
    res.status(201).json({ success: true, data: { id: creado._id } });
  } catch (err) { next(err); }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Carrito.findOneAndDelete({ usuario: id });
    await Usuario.findByIdAndDelete(id);
    res.json({ success: true, message: "Usuario y carrito eliminados" });
  } catch (err) { next(err); }
};
