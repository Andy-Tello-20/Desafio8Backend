import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id:{ type: String, required: true },
  title:{ type: String, required: true },
  description: { type: String, required: true },
  code:{ type: Number, required: true },
  price:{ type: Number, required: true },
  status:{ type: String, required: false },
  stock:{ type: Number, required: true },
  category:{ type: String, required: true },
  thumbnail:{ type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

