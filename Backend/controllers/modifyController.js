const productModel = require("../models/Products");

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
    let imageURL;
    imageURL = previousimage;
    if (req.file) {
      let imageBuffer = req.file.buffer;
      const image = imageBuffer.toString("base64");
      imageURL = await uploadImage(image);
    }

    await productModel.findOneAndUpdate(
      {
        _id: id,
      },
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
    console.error("Error updating the product:", error.message);
    res.redirect("/");
  }
};
