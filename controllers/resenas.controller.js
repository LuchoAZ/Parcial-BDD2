import Resena from "../models/Resena.js";
import Orden from "../models/Orden.js";
import Producto from "../models/Producto.js";

/** Listar todas las reseñas con datos de usuario y producto (ajustá 'from' si tus colecciones usan inglés) */
export const listarResenas = async (req,res,next)=>{
  try {
    const list = await Resena.aggregate([
      { $lookup: { from:"usuarios", localField:"user", foreignField:"_id", as:"usuario" } },
      { $lookup: { from:"productos", localField:"product", foreignField:"_id", as:"producto" } },
      { $unwind:"$usuario" },
      { $unwind:"$producto" },
      { $project: { rating:1, comment:1, "usuario.name":1, "usuario.email":1, "producto.name":1 } },
      { $sort: { createdAt:-1 } }
    ]);
    res.json({ success:true, data: list });
  } catch (err) { next(err); }
};

export const resenasPorProducto = async (req,res,next)=>{
  try {
    const { productId } = req.params;
    const list = await Resena.find({ product: productId }).populate("user","name");
    res.json({ success:true, data: list });
  } catch (err) { next(err); }
};

export const topResenas = async (req,res,next)=>{
  try {
    const avg = await Resena.aggregate([
      { $group: { _id:"$product", promedio:{ $avg:"$rating" }, total:{ $count:{} } } },
      { $lookup: { from:"productos", localField:"_id", foreignField:"_id", as:"producto" } },
      { $unwind:"$producto" },
      { $project: { _id:0, producto:"$producto.name", promedio:1, total:1 } },
      { $sort: { promedio:-1 } }
    ]);
    res.json({ success:true, data: avg });
  } catch (err) { next(err); }
};

export const crearResena = async (req,res,next)=>{
  try {
    const { product, rating, comment } = req.body;
    const bought = await Orden.exists({ user: req.user.id, "items.product": product });
    if (!bought) return res.status(400).json({ success:false, error:"Solo se puede reseñar productos comprados" });
    const review = await Resena.create({ user: req.user.id, product, rating, comment });
    await Producto.findByIdAndUpdate(product, { $inc: { reviewsCount: 1 } });
    res.status(201).json({ success:true, data: review });
  } catch (err) { next(err); }
};
