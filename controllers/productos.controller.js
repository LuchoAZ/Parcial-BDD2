import Producto from "../models/Producto.js";

export const listarProductos = async (req,res,next)=>{
  try {
    const lista = await Producto.find().populate("category","name description");
    res.json({ success:true, data: lista });
  } catch (err) { next(err); }
};

export const filtroProductos = async (req,res,next)=>{
  try {
    const { min=0, max=1e12, marca } = req.query;
    const cond = { price: { $gte: Number(min), $lte: Number(max) } };
    if (marca) cond.$or = [{ brand: { $eq: marca } }, { brand: { $ne: "" } }];
    const lista = await Producto.find(cond);
    res.json({ success:true, data: lista });
  } catch (err) { next(err); }
};

export const topProductos = async (req,res,next)=>{
  try {
    const top = await Producto.find().sort({ reviewsCount:-1 }).limit(10);
    res.json({ success:true, data: top });
  } catch (err) { next(err); }
};

export const crearProducto = async (req,res,next)=>{
  try {
    const creado = await Producto.create(req.body);
    res.status(201).json({ success:true, data: creado });
  } catch (err) { next(err); }
};

export const actualizarProducto = async (req,res,next)=>{
  try {
    const { id } = req.params;
    const actualizado = await Producto.findByIdAndUpdate(id, { $set:req.body }, { new:true });
    res.json({ success:true, data: actualizado });
  } catch (err) { next(err); }
};

export const eliminarProducto = async (req,res,next)=>{
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.json({ success:true, message: "Producto eliminado" });
  } catch (err) { next(err); }
};

export const actualizarStock = async (req,res,next)=>{
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const actualizado = await Producto.findByIdAndUpdate(id, { $set:{ stock } }, { new:true });
    res.json({ success:true, data: actualizado });
  } catch (err) { next(err); }
};
