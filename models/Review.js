// Import Mongoose for schema definition and MongoDB interaction
const mongoose = require("mongoose");

// Define the schema for a Review document
const reviewSchema = new mongoose.Schema({
    // Reference to the User who wrote the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to User model
      required: true
    },

    // Reference to the Book being reviewed
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Link to Book model
      required: true
    },

    // Rating given by the user (e.g., 1 to 5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    // Optional textual comment about the book
    comment: {
      type: String,
      trim: true
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);


// Export the Review model to use in other parts of the application
module.exports = mongoose.model("Review", reviewSchema);