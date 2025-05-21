// Import the Express framework
const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();

// Connect to MongoDB
db();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount all route modules under the "/api" base path
app.use("/api", require("./routes/authRoutes"));       // Routes for user signup/login
app.use("/api", require("./routes/bookRoutes"));       // Routes for book management
app.use("/api", require("./routes/reviewRoutes"));     // Routes for adding/updating/deleting reviews  


// Export the app instance so it can be used in server.js
module.exports = app;