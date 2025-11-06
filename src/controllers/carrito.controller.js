import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Obtener carrito de un usuario
export const obtenerCarrito = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const cart = await Cart.findOne({ user: usuarioId })
      .populate("items.product", "name price");

    res.json({
      success: true,
      data: cart || { user: usuarioId, items: [] },
    });
  } catch (err) {
    next(err);
  }
};

// Calcular total del carrito
export const totalCarrito = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    

    const cart = await Cart.findOne({ user: usuarioId });
    if (!cart)
      return res.json({ success: true, data: { total: 0, items: 0 } });

    const total = cart.items.reduce((acc, i) => acc + i.subtotal, 0);
    const items = cart.items.reduce((acc, i) => acc + i.quantity, 0);

    res.json({ success: true, data: { total, items } });
  } catch (err) {
    next(err);
  }
};

// Agregar producto al carrito
export const agregarAlCarrito = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const { productId, quantity } = req.body;

    const producto = await Product.findById(productId);
    if (!producto)
      return res
        .status(404)
        .json({ success: false, error: "Producto no encontrado" });

    const subtotal = producto.price * quantity;

    const actualizado = await Cart.findOneAndUpdate(
      { user: usuarioId },
      { $push: { items: { product: productId, quantity, subtotal } } },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, data: actualizado });
  } catch (err) {
    next(err);
  }
};

// Quitar producto del carrito
export const quitarDelCarrito = async (req, res, next) => {
  try {
    const { usuarioId,cartItemId } = req.params;

    const actualizado = await Cart.findOneAndUpdate(
      { user: usuarioId },
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );

    res.json({ success: true, data: actualizado });
  } catch (err) {
    next(err);
  }
};
