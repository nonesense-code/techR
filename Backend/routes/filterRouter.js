const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/products", async (req, res) => {
  try {
    const phones = productModel.find({ productType: "phone" });
    const laptops = productModel.find({ productType: "laptop" });
    const tablets = productModel.find({ productType: "tablet" });
    const mostpopular = productModel.find({ mostpopular: true });
    const mostsold = productModel.find({ mostsold: true });
    const midrange = productModel.find({ item_categorie: "midrange" });
    const flagship = productModel.find({ item_categorie: "flagship" });
    const recommended = productModel.find({ recommended: true });
    const popularity = productModel.find({ popularity: "popular" });
    const latest = productModel.find({ latest: true });
    const budget = productModel.find({ item_categorie: "budget" });

    const results = await Promise.all([
      phones,
      laptops,
      tablets,
      mostpopular,
      mostsold,
      midrange,
      flagship,
      recommended,
      popularity,
      latest,
      budget,
    ]);

    return res.json({
      phones: results[0],
      laptops: results[1],
      tablets: results[2],
      mostpopular: results[3],
      mostsold: results[4],
      midrange: results[5],
      flagship: results[6],
      recommended: results[7],
      popularity: results[8],
      latest: results[9],
      budget: results[10],
    });
  } catch (error) {
    console.error("Error fetching items:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

module.exports = router;
