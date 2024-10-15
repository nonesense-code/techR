const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const productModel = require("../Backend/models/Products");
require("dotenv").config();

const router = express.Router();

const findNames = async () => {
  try {
    const phone = [];
    const laptop = [];
    const tablet = [];
    const products = await productModel.find();
    products.forEach((product) => {
      if (product.productType === "phone") {
        phone.push(product.name.toLowerCase().split(" ").join(""));
      } else if (product.productType === "laptop") {
        laptop.push(product.name.toLowerCase().split(" ").join(""));
      } else if (product.productType === "tablet") {
        tablet.push(product.name.toLowerCase().split(" ").join(""));
      }
    });

    return { phone, laptop, tablet };
  } catch (error) {
    console.error("Error fetching product names:", error);
    return { phone: [], laptop: [], tablet: [] };
  }
};

const frontendURL = process.env.frontendURL;
router.get("/sitemap.xml", async (req, res) => {
  try {
    const { phone, laptop, tablet } = await findNames();
    const sitemap = new SitemapStream({
      hostname: `${frontendURL}`,
    });

    sitemap.write({ url: "/", priority: 1.0 });
    sitemap.write({ url: "/phone", priority: 1.0 });
    sitemap.write({ url: "/laptop", priority: 1.0 });
    sitemap.write({ url: "/tablet", priority: 1.0 });
    sitemap.write({ url: "/about", priority: 1.0 });
    sitemap.write({ url: "/filter", priority: 1.0 });

    phone.forEach((item) => {
      sitemap.write({
        url: `/phone/${item}`,
        priority: 1.0,
      });
    });

    laptop.forEach((item) => {
      sitemap.write({
        url: `/laptop/${item}`,
        priority: 1.0,
      });
    });

    tablet.forEach((item) => {
      sitemap.write({
        url: `/tablet/${item}`,
        priority: 1.0,
      });
    });

    sitemap.end();

    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
