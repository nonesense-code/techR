const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  let { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).send("All the fields are required!");
    }

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already registered");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Error generating salt");

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send("Error hashing password");

        try {
          let userData = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(userData);
          res.redirect("/users/login");
        } catch (createError) {
          console.error("Error creating user:", createError.message);
          return res.status(500).send("Error creating user");
        }
      });
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).send("Server error");
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).send("E-mail and Password are required!");
    }

    // Check if user exists
    let user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).send("E-mail or Password is incorrect");
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Error comparing passwords");
      }

      if (result) {
        // Generate token and set cookie
        let token = generateToken(user);
        console.log("Generated token:", token);
        res.cookie("token", token);

        // Send a success response (avoid redirect after sending a response)
        return res.status(200).send("Login successful!");
      } else {
        console.log("Incorrect password for email:", email);
        return res.status(401).send("Incorrect Password");
      }
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).send("Server error");
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
