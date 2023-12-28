const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    shortId: { type: String, require: true, unique: true },
    redirectURL: { require: true, type: String, unique: true},
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", schema);
module.exports = URL;
