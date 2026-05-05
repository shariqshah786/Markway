import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    colors: [
      {
        name: { type: String },
        hex: { type: String }
      }
    ],
    features: [{ type: String }],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
