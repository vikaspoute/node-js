const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
require("./controllers/url");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");

const staticRoute = require("./routes/staticRouters");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly } = require("./middleware/auth");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongo DB is now connected")
);

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
