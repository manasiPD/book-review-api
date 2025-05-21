// Import the User model
const User = require("../models/User");

// Import the JWT library to generate tokens
const jwt = require("jsonwebtoken");

/**
 * @route   POST /signup
 * @desc    Registers a new user and saves them to the database
 * @access  Public
 */
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  
  // Create a new user instance with provided credentials
  const user = new User({ username, password });
  
  // Save the user to the database (password will be hashed via pre-save hook)
  await user.save();
  
  // Respond with a success message
  res.status(201).json({ message: "User registered" });
};

/**
 * @route   POST /login
 * @desc    Authenticates user and returns a JWT token if credentials are valid
 * @access  Public
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Find the user by username
  const user = await User.findOne({ username });
  
  // If user doesn't exist or password is incorrect, return an error
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  // Generate a JWT token containing the user ID as payload
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  
  // Return the token in the response
  res.json({ token });
};