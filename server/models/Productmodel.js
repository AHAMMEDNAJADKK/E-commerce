import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    quality: {
      type: String,
      enum: ["7A", "10A"],
      required: true,
    },

    image: {
      type: String,
    },

    size: {
      type: String,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;