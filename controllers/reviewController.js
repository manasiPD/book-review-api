// Import the Review model
const Review = require("../models/Review");

/**
 * @route   POST /api/books/:id/reviews
 * @desc    Add a new review for a specific book
 * @access  Private (Authenticated users only, one review per user per book)
 */
exports.addReview = async (req, res) => {
  const { id } = req.params;

  // Check if the user has already submitted a review for this book
  const existing = await Review.findOne({ user: req.user.userId, book: id });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  // Create and save the new review with book and user reference
  const review = new Review({ ...req.body, user: req.user.userId, book: id });
  await review.save();

  // Return the newly created review
  res.status(201).json(review);
};

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update the authenticated user's own review
 * @access  Private
 */
exports.updateReview = async (req, res) => {

  // Find the review by ID and user ID, then update it
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },  // Ensure user can update only their review
    req.body,
    { new: true }  // Return the updated document
  );

  // If no matching review is found, return error
  if (!review) return res.status(404).json({ message: "Review not found" });
  
  // Respond with the updated review
  res.json(review);
};

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Delete the authenticated user's own review
 * @access  Private
 */
exports.deleteReview = async (req, res) => {
  
  // Find and delete the review by ID and user ID
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  
  // If no matching review is found, return error
  if (!review) return res.status(404).json({ message: "Review not found" });
  
  // Respond with confirmation message
  res.json({ message: "Deleted" });
};