const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productType: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  dtype: {
    type: String,
  },
  size: {
    type: String,
  },
  resolution: {
    type: String,
  },

  ram1: {
    type: String,
  },
  ram2: {
    type: String,
  },
  ram3: {
    type: String,
  },
  storage1: {
    type: String,
  },
  storage2: {
    type: String,
  },
  storage3: {
    type: String,
  },
  os: {
    type: String,
  },
  processor: {
    type: String,
  },
  graphics: {
    type: String,
  },
  capacity: {
    type: String,
  },
  charging: {
    type: String,
    },
  dimension: {
    type: String,
  },
  build: {
    type: String,
  },
  weight: {
    type: String,
  },
  wifi: {
    type: String,
  },
  bluetooth: {
    type: String,
  },
  typec: {
    type: String,
  },
  usba: {
    type: String,
  },
  ethernet: {
    type: String,
  },
  hdmi: {
    type: String,
  },
  audiojack: {
    type: String,
  },
  maincamera: {
    type: String,
  },
  frontcamera: {
    type: String,
  },
  video: {
    type: String,
  },
  price1: {
    type: String,
  },
  price2: {
    type: String,
  },
  price3: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  popularity: {
    type: String,
  },
  blog: {
    type: String,
  },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
