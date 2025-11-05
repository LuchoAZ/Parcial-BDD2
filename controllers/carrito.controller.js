import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";

export const obtenerCarrito = async (req,res,next)=>{
  try {
    const { usuarioId } = req.params;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === usuarioId;
    if (!esAdmin && !esDuenio) return res.status(403).json({ success:false, error:"No autorizado" });

    const cart = await Carrito.findOne({ usuario: usuarioId }).populate("items.product","name price");
    res.json({ success:true, data: cart || { usuario: usuarioId, items: [] } });
  } catch (err) { next(err); }
};

export const totalCarrito = async (req,res,next)=>{
  try {
    const { usuarioId } = req.params;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === usuarioId;
    if (!esAdmin && !esDuenio) return res.status(403).json({ success:false, error:"No autorizado" });

    const cart = await Carrito.findOne({ usuario: usuarioId });
    if (!cart) return res.json({ success:true, data: { total:0, items:0 } });
    const total = cart.items.reduce((acc,i)=> acc + i.subtotal, 0);
    const items = cart.items.reduce((acc,i)=> acc + i.quantity, 0);
    res.json({ success:true, data:{ total, items } });
  } catch (err) { next(err); }
};

export const agregarAlCarrito = async (req,res,next)=>{
  try {
    const { usuarioId } = req.params;
    const { productId, quantity } = req.body;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === usuarioId;
    if (!esAdmin && !esDuenio) return res.status(403).json({ success:false, error:"No autorizado" });

    const producto = await Producto.findById(productId);
    if (!producto) return res.status(404).json({ success:false, error:"Producto no encontrado" });

    const subtotal = producto.price * quantity;
    let cart = await Carrito.findOne({ usuario: usuarioId });
    if (!cart) cart = await Carrito.create({ usuario: usuarioId, items: [] });
    cart.items.push({ product: productId, quantity, subtotal });
    await cart.save();
    res.status(201).json({ success:true, data: cart });
  } catch (err) { next(err); }
};

export const quitarDelCarrito = async (req,res,next)=>{
  try {
    const { usuarioId } = req.params;
    const { productId } = req.body;
    const esAdmin = req.user?.role === "admin";
    const esDuenio = req.user?.id === usuarioId;
    if (!esAdmin && !esDuenio) return res.status(403).json({ success:false, error:"No autorizado" });

    const actualizado = await Carrito.findOneAndUpdate(
      { usuario: usuarioId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    res.json({ success:true, data: actualizado });
  } catch (err) { next(err); }
};
