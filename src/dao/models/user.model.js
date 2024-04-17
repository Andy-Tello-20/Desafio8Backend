import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: false, unique: false},
  password: {type: String, require:false},
  age: { type: Number, required: false },
  role:{ type: String, required: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);