const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Note-taking app API is running!");
});

module.exports = app;
