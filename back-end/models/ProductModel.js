// models/ProductModel.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  ram: { type: String, require:true },
  price: { type: Number, require:true},
  quantity: { type: Number, require:true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, require:true},
  subCategory: { type: String, require:true },
  description: { type: String, require:true},
images: { type: [String], required: true },
  variants: [variantSchema],
});

export default mongoose.model("Product", productSchema);
