import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false,default:"" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  active: {type: Boolean,default: true}
}, { timestamps: true });
export default mongoose.model('Product', ProductSchema);
