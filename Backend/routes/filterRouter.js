const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/phones", async (req, res) => {
  try {
    const products = await productModel.find({ productType: "phone" });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/laptops", async (req, res) => {
  try {
    const products = await productModel.find({ productType: "laptop" });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/tablets", async (req, res) => {
  try {
    const products = await productModel.find({ productType: "tablet" });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/mostpopular", async (req, res) => {
  try {
    const products = await productModel.find({ mostpopular: true });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/popularity", async (req, res) => {
  try {
    const products = await productModel.find({ popularity: "popular" });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/mostsold", async (req, res) => {
  try {
    const products = await productModel.find({ mostsold: true });

    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const products = await productModel.find({ latest: true });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/budget", async (req, res) => {
  try {
    const products = await productModel.find({ item_categorie: "budget" });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/midrange", async (req, res) => {
  try {
    const products = await productModel.find({ item_categorie: "midrange" });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/flagship", async (req, res) => {
  try {
    const products = await productModel.find({ item_categorie: "flagship" });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const products = await productModel.find({ latest: true });
    return res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

module.exports = router;
