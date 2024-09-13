const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dtype: {
    type: String,
    // required: true,
  },
  size: {
    type: String,
    // required: true,
  },
  resolution: {
    type: String,
    // required: true,
  },

  ram1: {
    type: String,
    // required: true,
  },
  ram2: {
    type: String,
    // required: true,
  },
  ram3: {
    type: String,
    // required: true,
  },
  storage1: {
    type: String,
    // required: true,
  },
  storage2: {
    type: String,
    // required: true,
  },
  storage3: {
    type: String,
    // required: true,
  },
  os: {
    type: String,
    // required: true,
  },
  processor: {
    type: String,
    // required: true,
  },
  graphics: {
    type: String,
    // required: true,
  },
  capacity: {
    type: String,
    // required: true,
  },
  charging: {
    type: String,
    // required: true,
  },
  dimension: {
    type: String,
    // required:true,
  },
  build: {
    type: String,
    // required: true,
  },
  weight: {
    type: String,
    //required:true,
  },
  wifi: {
    type: String,
    //required:true,
  },
  bluetooth: {
    type: String,
    //required:true,
  },
  typec: {
    type: String,
    // required: true,
  },
  usba: {
    type: String,
    // required: true,
  },
  ethernet: {
    type: String,
    // required: true,
  },
  hdmi: {
    type: String,
    //required:true,,
  },
  audiojack: {
    type: String,
    // required: true,
  },
  maincamera: {
    type: String,
    // required: true,
  },
  frontcamera: {
    type: String,
    //required:true,
  },
  video: {
    type: String,
    // required: true,
  },
  price1: {
    type: String,
    // required: true,
  },
  price2: {
    type: String,
    // required: true,
  },
  price3: {
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

module.exports = productModel;
