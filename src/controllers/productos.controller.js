import Product from "../models/Product.js";

// Listar todos los productos
export const listarProductos = async (req, res, next) => {
  try {
    const lista = await Product.find().populate("category", "name description");
    res.json({ success: true, data: lista });
  } catch (err) {
    next(err);
  }
};

// Filtro de productos por precio y marca
export const filtroProductos = async (req, res, next) => {
  try {
    const { min = 0, max = 1e12, marca } = req.query;
    const cond = { price: { $gte: Number(min), $lte: Number(max) } };

    if (marca)
      cond.$or = [{ brand: { $eq: marca } }, { brand: { $ne: "" } }];

    const lista = await Product.find(cond);
    res.json({ success: true, data: lista });
  } catch (err) {
    next(err);
  }
};

// Top 10 productos por cantidad de reseñas
export const topProductos = async (req, res, next) => {
  try {
    const top = await Product.find()
      .sort({ reviewsCount: -1 })
      .limit(10);
    res.json({ success: true, data: top });
  } catch (err) {
    next(err);
  }
};

// Crear nuevo producto
export const crearProducto = async (req, res, next) => {
  try {
    const creado = await Product.create(req.body);
    res.status(201).json({ success: true, data: creado });
  } catch (err) {
    next(err);
  }
};

// Actualizar producto existente
export const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const actualizado = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, data: actualizado });
  } catch (err) {
    next(err);
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
};

// Actualizar stock del producto
export const actualizarStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const actualizado = await Product.findByIdAndUpdate(
      id,
      { $set: { stock } },
      { new: true }
    );
    res.json({ success: true, data: actualizado });
  } catch (err) {
    next(err);
  }
};
