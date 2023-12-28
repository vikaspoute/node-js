const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("THis is home page");
});

app.get("/about", (req, res) => {
  res.end("THis is about page");
});

app.listen(8000, () => console.log("Server listening on 8000"));
