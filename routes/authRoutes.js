// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import controller functions for authentication
const { signup, login } = require("../controllers/authController");

/**
 * @route   POST /api/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", signup);

/**
 * @route   POST /api/login
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
router.post("/login", login);

// Export the router to use in main app
module.exports = router;