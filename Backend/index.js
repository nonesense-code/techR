const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const productModel = require("./models/Products.js");

dotenv.config();

const app = express();

const URI = process.env.URI;
const databaseConnection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
databaseConnection();
// const frontendURL = "https://tech-r-client.vercel.app";
const frontendURL = "http://192.168.254.8:3000";

app.use(
  cors({
    origin: `${frontendURL}`,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/addProduct", (req, res) => {
  res.render("addProduct");
});

app.post("/addProduct", async (req, res) => {
  let {
    type,
    name,
    display,
    processor,
    memory,
    storage,
    graphics,
    battery,
    build,
    camera,
    price,
    image,
    popularity,
    blog,
  } = req.body;
  if (
    !type ||
    !name ||
    !display ||
    !processor ||
    !memory ||
    !storage ||
    !graphics ||
    !battery ||
    !build ||
    !camera ||
    !price ||
    !image ||
    !popularity ||
    !blog
  )
    return res.json({ message: "All the fields are required" });

  const isExist = await productModel.findOne({ name });
  if (isExist)
    return res.json({ message: "Either name or image already exists" });
  else {
    try {
      const addItems = await productModel.create({
        productType: type,
        name,
        display,
        processor,
        memory,
        storage,
        graphics,
        battery,
        build,
        camera,
        price,
        image,
        popularity,
        blog,
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  res.redirect("/addProduct");
});

app.get("/product/api", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items", error });
  }
});

app.get("/product/api/:name", async (req, res) => {
  const { name } = req.params;
  let id;
  try {
    const products = await productModel.find();
    products.forEach((item) => {
      const dbName = item.name.toLowerCase().split(" ").join("");
      if (dbName === name) {
        id = item.id;
      }
    });
    const sendData = await productModel.findOne({ _id: id });
    res.json(sendData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/phones", async (req, res) => {
  const phones = await productModel.find({ productType: "phone" });
  res.render("Phones", { phones });
});

app.get("/laptops", async (req, res) => {
  const laptops = await productModel.find({ productType: "laptop" });
  res.render("Laptops", { laptops });
});

app.get("/tablets", async (req, res) => {
  const tablets = await productModel.find({ productType: "tablet" });
  res.render("Tablets", { tablets });
});

app.get("/modify", (req, res) => {
  res.render("modify");
});

app.get("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const find = await productModel.findOne({ _id: id });

    return res.render("modify", { find });
  } catch (error) {
    console.error("Error finding the product:", error);
    return res.redirect("/");
  }
});

app.post("/modify/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      type,
      name,
      display,
      memory,
      processor,
      storage,
      graphics,
      battery,
      build,
      camera,
      price,
      image,
      popularity,
      blog,
    } = req.body;

    await productModel.findOneAndUpdate(
      { _id: id },
      {
        productType: type,
        name,
        display,
        processor,
        memory,
        storage,
        graphics,
        battery,
        build,
        camera,
        price,
        image,
        popularity,
        blog,
      }
    );

    if (type === "phone") {
      res.redirect("/phones");
    } else if (type === "laptop") {
      res.redirect("/laptops");
    } else if (type === "tablet") {
      res.redirect("/tablets");
    } else {
      res.redirect("/phones");
    }
  } catch (error) {
    console.error("Error updating the product:", error);
    res.redirect("/");
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
