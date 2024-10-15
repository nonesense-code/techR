// const express = require("express");
// const router = express.Router();
// const { SitemapStream, streamToPromise } = require("sitemap");

// router.get("/", (req, res) => {
//   res.render("Home");
// });
// const frontendURL = "http://192.168.254.9:3000/";

// router.get("/sitemap.xml", async (req, res) => {
//   try {
//     const sitemap = new SitemapStream({ hostname: `${frontendURL}` });

//     sitemap.write({ url: "/", priority: 1.0 });
//     sitemap.write({ url: "/phone", priority: 0.9 });
//     sitemap.write({ url: "/laptop", priority: 0.9 });
//     sitemap.write({ url: "/tablet", priority: 0.9 });
//     sitemap.write({ url: "/about", priority: 0.8 });
//     sitemap.write({ url: "/filter", priority: 0.8 });
//     sitemap.write({ url: "/phone/item1", priority: 0.7 });
//     sitemap.write({ url: "/laptop/item1", priority: 0.7 });
//     sitemap.write({ url: "/tablet/item1", priority: 0.7 });

//     sitemap.end();

//     const xml = await streamToPromise(sitemap).then((data) => data.toString());

//     res.header("Content-Type", "application/xml");
//     res.send(xml);
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//     res.status(500).send("Error generating sitemap");
//   }
// });

// module.exports = router;
const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");

const router = express.Router();
const frontendURL = "http://192.168.254.9:3000/"; // Use your actual frontend URL

// Route for rendering the Home page
router.get("/", (req, res) => {
  res.render("Home"); // Make sure the view engine is set up correctly to render "Home"
});

// Route for generating the sitemap
router.get("/sitemap.xml", async (req, res) => {
  try {
    const sitemap = new SitemapStream({ hostname: frontendURL });

    // Define your URLs here
    sitemap.write({ url: "/", priority: 1.0 });
    sitemap.write({ url: "/phone", priority: 0.9 });
    sitemap.write({ url: "/laptop", priority: 0.9 });
    sitemap.write({ url: "/tablet", priority: 0.9 });
    sitemap.write({ url: "/about", priority: 0.8 });
    sitemap.write({ url: "/filter", priority: 0.8 });
    sitemap.write({ url: "/phone/item1", priority: 0.7 });
    sitemap.write({ url: "/laptop/item1", priority: 0.7 });
    sitemap.write({ url: "/tablet/item1", priority: 0.7 });

    sitemap.end(); // End the stream

    // Convert the stream to XML format
    const xml = await streamToPromise(sitemap).then((data) => data.toString());

    res.header("Content-Type", "application/xml"); // Set response header to XML
    res.send(xml); // Send the generated XML as the response
  } catch (error) {
    console.error("Error generating sitemap:", error); // Log error
    res.status(500).send("Error generating sitemap"); // Send error response
  }
});

module.exports = router; // Export the router for use in your main app
