// Import Mongoose for creating schema and interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for a Book document
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Book title is required
  },
  author: {
    type: String,
    required: true // Author name is required
  },
  genre: {
    type: String,
    required: true // Genre is required (e.g., Fiction, Thriller, etc.)
  }
});


// Export the Book model to use in other parts of the application
module.exports = mongoose.model("Book", bookSchema);