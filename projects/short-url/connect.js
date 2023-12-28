const mongoose = require("mongoose");

// Define an asynchronous function to connect to MongoDB
async function connectToMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
}

module.exports = {
  connectToMongoDB,
};
