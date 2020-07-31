const router = require("express").Router();
const User = require("../models/user");
const inputValidation = require("./utils/validation");

router.post("/register", inputValidation, async (req, res) => {
  
  //check if username already exists in database
  const userExist = await User.findOne({ name: req.body.name });
  if (userExist) return res.status(400).send("Username taken");

  const user = new User({
    name: req.body.name,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send("User Created");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
