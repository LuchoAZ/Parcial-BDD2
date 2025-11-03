import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 } // denormalized helper
}, { timestamps: true });
export default mongoose.model('Product', ProductSchema);
