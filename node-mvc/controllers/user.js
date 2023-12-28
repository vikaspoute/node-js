const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleCreateUser(req, res) {
  try {
    const body = req.body;

    // Check if the email already exists
    const existingEmailUser = await User.findOne({ email: body.email });
    if (existingEmailUser) {
      return res.status(409).json({ msg: "Email already in use" });
    }

    // If all checks pass, create the user
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    console.log("result: " + result);

    return res
      .status(201)
      .json({ obj: result, msg: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleUserUpdate(req, res) {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    // Use findByIdAndUpdate to update the user by ID
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      // If the user with the given ID is not found, return a 404 Not Found status
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the updated user
    return res.json({ obj: updatedUser, msg: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleGetUser(req, res) {
  const userId = req.params.userId;
  try {
    // Use findById to retrieve the user by ID
    const user = await User.findById(userId);

    if (!user) {
      // If the user with the given ID is not found, return a 404 Not Found status
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the user
    return res.json(user);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error retrieving user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleDeleteUser(req, res) {
  const userId = req.params.userId;

  try {
    // Use findByIdAndDelete to remove the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      // If the user with the given ID is not found, return a 404 Not Found status
      return res.status(404).json({ msg: "User not found" });
    }

    // Return a success message or the deleted user details
    return res.json({ msg: "User deleted successfully", obj: deletedUser });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error deleting user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleUserUpdate,
  handleGetUser,
  handleDeleteUser,
};
