const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user with provided email and password exists
    const user = await User.findOne({ email, password });

    if (user) {
      // Successful login
      const token = setUser(user);
      res.cookie("uuid", token);
      return res.redirect("/");
    } else {
      // Invalid credentials
      return res.render("login", { error: "Invalid email or password" });
    }
  } catch (error) {
    // Handle database error or other issues
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
