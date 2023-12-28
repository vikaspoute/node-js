const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRoutes = require("./routes/user");

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://localhost:27017/node-mvc").then(() =>
  console.log("MongoDB Connected")
);
app.use(express.json());
app.use(logReqRes("log.txt"));

app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
