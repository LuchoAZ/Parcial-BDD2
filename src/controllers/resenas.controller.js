import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { isOwnerOrAdminHelper } from "../middlewares/auth.js";

// Listar todas las reseñas con usuario y producto
export const listarResenas = async (req, res, next) => {
  try {
    const list = await Review.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "usuario",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "producto",
        },
      },
      { $unwind: "$usuario" },
      { $unwind: "$producto" },
      {
        $project: {
          rating: 1,
          comment: 1,
          "usuario.name": 1,
          "usuario.email": 1,
          "producto.name": 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

// Listar reseñas de un producto
export const resenasPorProducto = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const list = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};

// Top reseñas: promedio de rating por producto
export const topResenas = async (req, res, next) => {
  try {
    const avg = await Review.aggregate([
      {
        $group: {
          _id: "$product",
          promedio: { $avg: "$rating" },
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "producto",
        },
      },
      { $unwind: "$producto" },
      {
        $project: {
          _id: 0,
          producto: "$producto.name",
          promedio: 1,
          total: 1,
        },
      },
      { $sort: { promedio: -1 } },
    ]);
    res.json({ success: true, data: avg });
  } catch (err) {
    next(err);
  }
};

// Crear reseña (solo si el usuario compró el producto)
export const crearResena = async (req, res, next) => {
  try {
    const { product, rating, comment } = req.body;

    // Verifica si el usuario compró el producto
    const bought = await Order.exists({
      user: req.user.id,
      "items.product": product,
    });
    if (!bought)
      return res.status(400).json({
        success: false,
        error: "Solo se puede reseñar productos comprados",
      });
    const alreadyExisting = await Review.findOne({ product, user: req.user.id });
    if (alreadyExisting) {
       return res.status(400).json({
        success: false,
        error: "Solo se puede crear una reseña por producto",
      });
    }

    // Crea la reseña
    const review = await Review.create({
      user: req.user.id,
      product,
      rating,
      comment,
    });

    // Incrementa el contador de reseñas en el producto
    let reviewsCount = (await Review.find({product: review.product})).length
    await Product.findByIdAndUpdate(review.product, { reviewsCount });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

export const eliminarResena = async (req, res, next) => {
  try {
    const { id } = req.params;
    let review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Reseña no encontrada.",
      });
    }

    if (!isOwnerOrAdminHelper(req.user,review.user))
      return res.status(400).json({
        success: false,
        error: "Solo se puede eliminar las reseñas propias.",
      });
    await Review.findByIdAndDelete(id);
    let reviewsCount = (await Review.find({product: review.product})).length
    await Product.findByIdAndUpdate(review.product, { reviewsCount });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};
