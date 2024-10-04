const productModel = require("../models/Products");
const cloudinary = require("cloudinary");

module.exports.modifyProducts = async (req, res) => {
  try {
    const id = req.params.id;
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
      previousimage,
    } = req.body;

    let imageURL = previousimage;

    if (req.file) {
      const imageBuffer = req.file.buffer;
      const image = imageBuffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${image}`,
        {
          folder: "products",
        }
      );
      imageURL = result.secure_url;
    }

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

    // Redirect based on product type
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
};
