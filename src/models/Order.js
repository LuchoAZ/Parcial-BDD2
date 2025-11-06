import mongoose from 'mongoose';
const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [OrderItemSchema], required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pendiente','pagado','enviado','cancelado','completado'], default: 'pendiente' },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default:'efectivo' }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
