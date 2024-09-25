const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const productModel = require("./models/Products.js");
const cloudinary = require("cloudinary");
dotenv.config();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${filePath}`,
      {
        resource_type: "image",
      }
    );
    console.log(result.secure_url);
    return result.url;
  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
};

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

const corsOptions = {
  origin: frontendURL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/addProduct", (req, res) => {
  res.render("addProduct");
});

app.post("/addProduct", upload.single("image"), async (req, res) => {
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
    blog,
  } = req.body;

  let imageBuffer = req.file.buffer;
  const image = imageBuffer.toString("base64");
  let imageURL = await uploadImage(image);

  if (!name || !image) {
    return res.json({ message: "Name and image are required!" });
  }
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
        image: imageURL,
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

app.post("/modify/:id", upload.single("image"), async (req, res) => {
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
      blog,
    } = req.body;

    let imageBuffer = req.file.buffer;
    const image = imageBuffer.toString("base64");
    let imageURL = await uploadImage(image);

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
        image: imageURL,
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
