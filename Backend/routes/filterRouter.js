const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/phone", async (req, res) => {
  try {
    const phone = await productModel.find({ productType: "phone" });
    res.json(phone);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/laptop", async (req, res) => {
  try {
    const laptop = await productModel.find({ productType: "laptop" });
    res.json(laptop);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/tablet", async (req, res) => {
  try {
    const tablet = await productModel.find({ productType: "tablet" });
    res.json(tablet);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latest = await productModel.find({ latest: true });
    res.json(latest);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetgamer", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "gaming",
    });
    res.json(targetaudience);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetprofessional", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "professional",
    });
    res.json(targetaudience);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetstudents", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "students",
    });
    res.json(targetaudience);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetnormalusage", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "normalusage",
    });
    res.json(targetaudience);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostpopular", async (req, res) => {
  try {
    const mostpopular = await productModel.find({ mostpopular: true });
    res.json(mostpopular);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/popularity", async (req, res) => {
  try {
    const popularity = await productModel.find({ popularity: "popular" });
    res.json(popularity);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostsold", async (req, res) => {
  try {
    const mostsold = await productModel.find({ mostsold: true });
    res.json(mostsold);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/budget", async (req, res) => {
  try {
    const budget = await productModel.find({ item_categorie: "budget" });
    res.json(budget);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/midrange", async (req, res) => {
  try {
    const midrange = await productModel.find({ item_categorie: "midrange" });
    res.json(midrange);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/flagship", async (req, res) => {
  try {
    const flagship = await productModel.find({ item_categorie: "flagship" });
    res.json(flagship);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const recommended = await productModel.find({ recommended: true });
    res.json(recommended);
  } catch (error) {
    console.log("Error", error.message);
  }
});

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
      latest,
      budget,
      mostsold,
      midrange,
      flagship,
      recommended,
      popularity,
    ]);

    console.log(phones);
    return res.json({
      phones: results[0],
      laptops: results[1],
      tablets: results[2],
      mostpopular: results[3],
      latest: results[9],
      budget: results[10],
      mostsold: results[4],
      midrange: results[5],
      flagship: results[6],
      recommended: results[7],
      popularity: results[8],
    });
  } catch (error) {
    console.error("Error fetching items:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

module.exports = router;
