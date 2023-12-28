const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 8080;

// Connection
mongoose
  .connect("mongodb://localhost:27017/nodejs-mongodb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB: " + err));

// Schema
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("users", schema);

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;

    // Check if the email already exists
    const existingEmailUser = await User.findOne({ email: body.email });
    if (existingEmailUser) {
      return res.status(409).json({ msg: "Email already in use" });
    }

    // Check if the firstName already exists
    const existingFirstNameUser = await User.findOne({
      firstName: body.firstName,
    });
    if (existingFirstNameUser) {
      return res.status(409).json({ msg: "First name already in use" });
    }

    // Check if the lastName already exists
    const existingLastNameUser = await User.findOne({
      lastName: body.lastName,
    });
    if (existingLastNameUser) {
      return res.status(409).json({ msg: "Last name already in use" });
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
});

// get all the users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Update a user by ID
app.put("/api/users/:userId", async (req, res) => {
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
});

// get user by id
app.get("/api/users/:userId", async (req, res) => {
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
});

// Delete user by ID
app.delete("/api/users/:userId", async (req, res) => {
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
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
