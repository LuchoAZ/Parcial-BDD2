import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Crear nueva orden a partir del carrito
export const crearOrden = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ usuario: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ success: false, error: "Carrito vacío" });

    const total = cart.items.reduce((acc, i) => acc + i.subtotal, 0);

    const orden = await Order.create({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        subtotal: i.subtotal,
      })),
      total,
      paymentMethod: req.body.paymentMethod || "cash",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, data: orden });
  } catch (err) {
    next(err);
  }
};

// Listar todas las órdenes (solo admin)
export const listarOrdenes = async (req, res, next) => {
  try {
    const ordenes = await Order.find().populate("user", "name email");
    res.json({ success: true, data: ordenes });
  } catch (err) {
    next(err);
  }
};

// Listar órdenes por usuario
export const ordenesPorUsuario = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === userId;
    if (!esAdmin && !esDuenio)
      return res.status(403).json({ success: false, error: "No autorizado" });

    const ordenes = await Order.find({ user: userId });
    res.json({ success: true, data: ordenes });
  } catch (err) {
    next(err);
  }
};

// Estadísticas de órdenes por estado
export const statsOrdenes = async (req, res, next) => {
  try {
    const stats = await Order.aggregate([
      { $group: { _id: "$status", total: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", total: 1 } },
      { $sort: { total: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

// Actualizar estado de una orden
export const actualizarEstadoOrden = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
