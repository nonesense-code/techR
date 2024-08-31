import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  display: {
    type: String,
    // required: true,
  },
  processor: {
    type: String,
    // required: true,
  },
  memory: {
    type: String,
    // required: true,
  },
  storage: {
    type: String,
    // required: true,
  },
  graphics: {
    type: String,
    // required: true,
  },
  battery: {
    type: String,
    // required: true,
  },
  build: {
    type: String,
    // required: true,
  },
  camera: {
    type: String,
    // required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    required: true,
  },
  popularity: {
    type: String,
    required: true,
  },

  blog: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("product", productSchema);
export default productModel;
