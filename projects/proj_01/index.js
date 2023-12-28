const express = require("express");
const fs = require("fs");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 8080;

app.use(express.json());

// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Get a specific user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// Create a new user
app.post("/api/users", (req, res) => {
  const body = req.body; // Assuming request body contains the new user object
  users.push({ id: users.length + 1, ...body });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return res.status(201).json(body);
});

// Update a user by ID
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body; // Assuming request body contains the updated user object
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

    return res.json(users[index]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });

    return res.json(deletedUser[0]);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
