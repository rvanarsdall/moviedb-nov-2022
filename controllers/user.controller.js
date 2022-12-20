//? Add your boilerplate code for a controller
//? Create a route that is a POST ("/signup")
//? Make sure route is working
//? Full url localhost:4000/user/signup

// ! break down the url to two levels -  /user = first level belongs on the app.js ;  /signup = second level belongs on the controller
const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    // 1. create a new object based off the Model Schema (ie User)

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    // 2. Try Catch - we want to try and save the data but if we get an error we want to send back the error message.
    const newUser = await user.save();

    res.json({
      user: newUser,
      message: "Success: User Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//? Create a ('/login') route POST
//? Make sure the route is working
//? Full url: localhost:4000/user/login
//? Try to console log the email in the route

router.post("/login", async (req, res) => {
  try {
    // 1. Check our database to see if the email that is supplied in the body is found in our database
    const user = await User.findOne({ email: req.body.email });

    // 2. if we found a document (aka record) in the database validate that password matches otherwise send a response that we don't have a match

    // We don't find a user we exit and throw an ERROR
    if (!user) {
      throw new Error("User Not Found");
    }
    const isPasswordMatch = user.password === req.body.password;
    // Passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Passwords Do Not Match");
    }
    // Pass all our checks
    res.json({ user: user, message: "Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;

// user
//   .save()
//   .then((newUser) =>
//     res.json({ user: newUser, message: "Success User Created" })
//   )
//   .catch((err) => res.json({ error: err.message }));
