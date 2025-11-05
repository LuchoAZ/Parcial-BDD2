import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

export const listarCategorias = async (req,res,next)=>{
  try {
    const list = await Categoria.find();
    res.json({ success:true, data:list });
  } catch (err) { next(err); }
};

export const crearCategoria = async (req,res,next)=>{
  try {
    const creada = await Categoria.create(req.body);
    res.status(201).json({ success:true, data:creada });
  } catch (err) { next(err); }
};

export const actualizarCategoria = async (req,res,next)=>{
  try {
    const { id } = req.params;
    const cat = await Categoria.findByIdAndUpdate(id, { $set:req.body }, { new:true });
    res.json({ success:true, data:cat });
  } catch (err) { next(err); }
};

export const eliminarCategoria = async (req,res,next)=>{
  try {
    const { id } = req.params;
    await Categoria.findByIdAndDelete(id);
    res.json({ success:true, message:"Categoría eliminada" });
  } catch (err) { next(err); }
};

export const statsCategorias = async (req,res,next)=>{
  try {
    const stats = await Producto.aggregate([
      { $group: { _id: "$category", cantidad: { $sum: 1 } } },
      { $lookup: { from: "categorias", localField: "_id", foreignField: "_id", as:"categoria" } },
      { $unwind: "$categoria" },
      { $project: { _id:0, categoria:"$categoria.name", cantidad:1 } },
      { $sort: { cantidad:-1 } }
    ]);
    res.json({ success:true, data:stats });
  } catch (err) { next(err); }
};
