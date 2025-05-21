// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import authentication middleware to protect review routes
const auth = require("../middleware/auth");

// Import review controller functions
const {
  addReview, updateReview, deleteReview
} = require("../controllers/reviewController");

/**
 * @route   POST /api/books/:id/reviews
 * @desc    Submit a review for a specific book (one review per user per book)
 * @access  Private
 */
router.post("/books/:id/reviews", auth, addReview);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update the authenticated user's own review
 * @access  Private
 */
router.put("/reviews/:id", auth, updateReview);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete the authenticated user's own review
 * @access  Private
 */
router.delete("/reviews/:id", auth, deleteReview);

// Export the router for use in main app
module.exports = router;