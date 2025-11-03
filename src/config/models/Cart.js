import mongoose from 'mongoose';
const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true }
}, {_id:false});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  items: { type: [CartItemSchema], default: [] }
}, { timestamps: true });

export default mongoose.model('Cart', CartSchema);
