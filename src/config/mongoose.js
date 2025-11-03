import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/parcial_ecommerce';
mongoose.set('strictQuery', true);
mongoose.connect(uri).then(()=>{
  console.log('✅ Conectado a MongoDB');
}).catch(err=>{
  console.error('❌ Error conectando a MongoDB', err);
});
