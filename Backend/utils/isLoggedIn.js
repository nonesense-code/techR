const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.redirect("/users/login");
    }
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.redirect("/users/login");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error occurred during authentication", error);
    res.redirect("/");
  }
};
