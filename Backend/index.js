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
    await mongoose.connect(URI);
    console.log("MongoDB Connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
databaseConnection();

const frontendURL = process.env.frontendURL;

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
    productType,
    popularity,
    name,
    dimension,
    build,
    weight,
    dtype,
    size,
    resolution,
    os,
    processor,
    graphics,
    ram1,
    ram2,
    ram3,
    storage1,
    storage2,
    storage3,
    capacity,
    charging,
    wifi,
    bluetooth,
    typec,
    usba,
    ethernet,
    hdmi,
    audiojack,
    maincamera,
    frontcamera,
    video,
    price1,
    price2,
    price3,
    image,
    blog,
  } = req.body;
  if (
    !productType ||
    !popularity ||
    !name ||
    !dimension ||
    !build ||
    !weight ||
    !dtype ||
    !size ||
    !resolution ||
    !os ||
    !processor ||
    !graphics ||
    !ram1 ||
    !ram2 ||
    !ram3 ||
    !storage1 ||
    !storage2 ||
    !storage3 ||
    !capacity ||
    !charging ||
    !wifi ||
    !bluetooth ||
    !typec ||
    !usba ||
    !ethernet ||
    !hdmi ||
    !audiojack ||
    !maincamera ||
    !frontcamera ||
    !video ||
    !price1 ||
    !price2 ||
    !price3 ||
    !image ||
    !blog
  )
    return res.json({ message: "All the fields are required" });

  const isExist = await productModel.findOne({ name });
  if (isExist)
    return res.json({ message: "Either name or image already exists" });
  else {
    try {
      const addItems = await productModel.create({
        productType,
        popularity,
        name,
        dimension,
        build,
        weight,
        dtype,
        size,
        resolution,
        os,
        processor,
        graphics,
        ram1,
        ram2,
        ram3,
        storage1,
        storage2,
        storage3,
        capacity,
        charging,
        wifi,
        bluetooth,
        typec,
        usba,
        ethernet,
        hdmi,
        audiojack,
        maincamera,
        frontcamera,
        video,
        price1,
        price2,
        price3,
        image,
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
      return;
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
      productType,
      popularity,
      name,
      dimension,
      build,
      weight,
      dtype,
      size,
      resolution,
      os,
      processor,
      graphics,
      ram1,
      ram2,
      ram3,
      storage1,
      storage2,
      storage3,
      capacity,
      charging,
      wifi,
      bluetooth,
      typec,
      usba,
      ethernet,
      hdmi,
      audiojack,
      maincamera,
      frontcamera,
      video,
      price1,
      price2,
      price3,
      image,
      blog,
    } = req.body;

    await productModel.findOneAndUpdate(
      { _id: id },
      {
        productType,
        popularity,
        name,
        dimension,
        build,
        weight,
        dtype,
        size,
        resolution,
        os,
        processor,
        graphics,
        ram1,
        ram2,
        ram3,
        storage1,
        storage2,
        storage3,
        capacity,
        charging,
        wifi,
        bluetooth,
        typec,
        usba,
        ethernet,
        hdmi,
        audiojack,
        maincamera,
        frontcamera,
        video,
        price1,
        price2,
        price3,
        image,
        blog,
      }
    );

    if (productType === "phone") {
      res.redirect("/phones");
    } else if (productType === "laptop") {
      res.redirect("/laptops");
    } else if (productType === "tablet") {
      res.redirect("/tablets");
    } else {
      res.redirect("/");
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
