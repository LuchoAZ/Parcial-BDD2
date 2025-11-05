import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Listar todas las categorías
export const listarCategorias = async (req, res, next) => {
  try {
    const list = await Category.find();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

// Crear nueva categoría
export const crearCategoria = async (req, res, next) => {
  try {
    const creada = await Category.create(req.body);
    res.status(201).json({ success: true, data: creada });
  } catch (err) {
    next(err);
  }
};

// Actualizar categoría existente
export const actualizarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, data: cat });
  } catch (err) {
    next(err);
  }
};

// Eliminar categoría
export const eliminarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: "Categoría eliminada" });
  } catch (err) {
    next(err);
  }
};

// Estadísticas de productos por categoría
export const statsCategorias = async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", cantidad: { $sum: 1 } } },
      {
        $lookup: {
          from: "categories", // 🔥 nombre real de la colección en inglés
          localField: "_id",
          foreignField: "_id",
          as: "categoria",
        },
      },
      { $unwind: "$categoria" },
      {
        $project: {
          _id: 0,
          categoria: "$categoria.name",
          cantidad: 1,
        },
      },
      { $sort: { cantidad: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};
