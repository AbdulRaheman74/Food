import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // ✅ fixed
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
  },
  { minimize: false } // ✅ this should be in the second argument (outside the field object)
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
