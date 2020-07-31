const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const inputValidation = require("./utils/validation");
const User = require("./../models/user");

dotenv.config();
router.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Username or Password incorrect");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Username or Password incorrect");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).send(token);
});

module.exports = router;
