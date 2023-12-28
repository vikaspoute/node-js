const jwt = require("jsonwebtoken");
const secret = "#$%*!Vikas@";

function setUser(user) {
  try {
    // Create a JWT payload using jwt.sign
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      secret
    );

    return token;
  } catch (error) {
    // Handle the error
    console.error("Error creating JWT:", error.message);
    return null;
  }
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    // Handle the error
    console.error("Error verifying token:", error.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
