// Import the jsonwebtoken library to verify JWT tokens
const jwt = require("jsonwebtoken");



// Middleware to authenticate routes using JWT
// Adds the decoded user data to req.user if valid token is present
module.exports = (req, res, next) => {

  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is provided, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded payload (e.g., userId) in the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch {

    // If token is invalid or expired, respond with 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
};
