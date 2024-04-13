import mongoose from "mongoose";

const clothingProduct = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids"],
  },
  subcategory: {
    type: String,
    required:true,
    enum: ["Shirts", "T-shirts", "Sweatshirts", "Trousers"],
  },
  size: {
    type: [String],
    enum: ["Small", "Medium", "Large", "Extra Large"],
    default: ["Small", "Medium", "Large", "Extra Large"],
  },
  mainImage: {
    type: String,
    required: true,
  },
  
});

const ClothingProduct =
  mongoose.models.ClothingProduct ||
  mongoose.model("ClothingProduct", clothingProduct);

export default ClothingProduct;
