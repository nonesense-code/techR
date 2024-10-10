const express = require("express");
const router = express.Router();
const productModel = require("../models/Products");

router.get("/phone", async (req, res) => {
  try {
    const phone = await productModel.find({ productType: "phone" });
    const formattedData = phone.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/laptop", async (req, res) => {
  try {
    const laptop = await productModel.find({ productType: "laptop" });
    const formattedData = laptop.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/tablet", async (req, res) => {
  try {
    const tablet = await productModel.find({ productType: "tablet" });
    const formattedData = tablet.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latest = await productModel.find({ latest: true });
    const formattedData = latest.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetgamer", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "gaming",
    });
    const formattedData = targetaudience.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetprofessional", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "professional",
    });
    const formattedData = targetaudience.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetstudents", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "students",
    });
    const formattedData = targetaudience.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/targetnormalusage", async (req, res) => {
  try {
    const targetaudience = await productModel.find({
      targetaudience: "normalusage",
    });
    const formattedData = targetaudience.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostpopular", async (req, res) => {
  try {
    const mostpopular = await productModel.find({ mostpopular: true });
    const formattedData = mostpopular.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/popularity", async (req, res) => {
  try {
    const popularity = await productModel.find({ popularity: "popular" });
    const formattedData = popularity.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/mostsold", async (req, res) => {
  try {
    const mostsold = await productModel.find({ mostsold: true });
    const formattedData = mostsold.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/budget", async (req, res) => {
  try {
    const budget = await productModel.find({ item_categorie: "budget" });
    const formattedData = budget.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/midrange", async (req, res) => {
  try {
    const midrange = await productModel.find({ item_categorie: "midrange" });
    const formattedData = midrange.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/flagship", async (req, res) => {
  try {
    const flagship = await productModel.find({ item_categorie: "flagship" });
    const formattedData = flagship.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const recommended = await productModel.find({ recommended: true });
    const formattedData = recommended.map((item) => ({
      name: item.name,
      blog: item.blog,
      image: item.image,
      productType: item.productType,
      price1: item.price1,
    }));
    res.json(formattedData);
  } catch (error) {
    console.log("Error", error.message);
  }
});

// router.get("/products", async (req, res) => {
//   try {
//     const phones = productModel.find({ productType: "phone" });
//     const laptops = productModel.find({ productType: "laptop" });
//     const tablets = productModel.find({ productType: "tablet" });
//     const mostpopular = productModel.find({ mostpopular: true });
//     const mostsold = productModel.find({ mostsold: true });
//     const midrange = productModel.find({ item_categorie: "midrange" });
//     const flagship = productModel.find({ item_categorie: "flagship" });
//     const recommended = productModel.find({ recommended: true });
//     const popularity = productModel.find({ popularity: "popular" });
//     const latest = productModel.find({ latest: true });
//     const budget = productModel.find({ item_categorie: "budget" });

//     const results = await Promise.all([
//       phones,
//       laptops,
//       tablets,
//       mostpopular,
//       latest,
//       budget,
//       mostsold,
//       midrange,
//       flagship,
//       recommended,
//       popularity,
//     ]);

//     console.log(phones);
//     return res.json({
//       phones: results[0],
//       laptops: results[1],
//       tablets: results[2],
//       mostpopular: results[3],
//       latest: results[9],
//       budget: results[10],
//       mostsold: results[4],
//       midrange: results[5],
//       flagship: results[6],
//       recommended: results[7],
//       popularity: results[8],
//     });
//   } catch (error) {
//     console.error("Error fetching items:", error.message, error.stack);
//     res.status(500).json({ message: "Error fetching items", error });
//   }
// });

module.exports = router;
