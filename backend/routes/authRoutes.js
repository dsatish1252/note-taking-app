// server/routes/authRoutes.js

const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // Import protect middleware

const router = express.Router();

// Public routes - No token required for these
router.post("/register", registerUser); 
router.post("/login", loginUser); 

// Protected routes - Token required for these
router.get("/me", protect, getMe); // This one *does* need protect

module.exports = router;
