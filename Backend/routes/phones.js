const express = require("express");
const router = express();
const productModel = require("../models/Products");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", async (req, res) => {
  const phones = await productModel.find({ productType: "phone" });
  res.render("Phones", { phones });
});

module.exports = router;
