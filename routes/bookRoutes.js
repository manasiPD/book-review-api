// Import Express and create a router instance
const express = require("express");
const router = express.Router();

// Import authentication middleware to protect certain routes
const auth = require("../middleware/auth");

// Import book-related controller functions
const {
  addBook, getBooks, getBookDetails, searchBooks
} = require("../controllers/bookController");

/**
 * @route   POST /api/books
 * @desc    Add a new book (authenticated users only)
 * @access  Private
 */
router.post("/books", auth, addBook);

/**
 * @route   GET /api/books
 * @desc    Get all books with optional filters (author, genre) and pagination
 * @access  Public
 */
router.get("/books", getBooks);

/**
 * @route   GET /api/books/:id
 * @desc    Get details of a specific book by ID, including average rating and reviews
 * @access  Public
 */
router.get("/books/:id", getBookDetails);

/**
 * @route   GET /api/search
 * @desc    Search books by title or author (partial and case-insensitive)
 * @access  Public
 */
router.get("/search", searchBooks);

// Export the router to use in the main app
module.exports = router;