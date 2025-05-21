// Import the Book and Review models
const Book = require("../models/Book");
const Review = require("../models/Review");

/**
 * @route   POST /api/books
 * @desc    Add a new book to the collection
 * @access  Private (Authenticated users only)
 */
exports.addBook = async (req, res) => {
  
  // Create a new Book instance using request body
  const book = new Book(req.body);
  
  // Save the book to the database
  await book.save();
  
  // Respond with the created book
  res.status(201).json(book);
};

/**
 * @route   GET /api/books
 * @desc    Get all books with optional filters and pagination
 * @access  Public
 */
exports.getBooks = async (req, res) => {
  
  // Extract query parameters for pagination and filtering
  const { page = 1, limit = 10, author, genre } = req.query;
  
  // Initialize filter object
  const filter = {};
  if (author) filter.author = author;
  if (genre) filter.genre = genre;

  // Fetch books with filters, skip, and limit for pagination
  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  
  // Respond with the list of books
  res.json(books);
};

/**
 * @route   GET /api/books/:id
 * @desc    Get detailed info about a book including average rating and all reviews
 * @access  Public
 */
exports.getBookDetails = async (req, res) => {
  
  // Find the book by ID
  const book = await Book.findById(req.params.id);
  
  // Find all reviews associated with this book, and populate user data
  const reviews = await Review.find({ book: book._id }).populate("user", "username");
  
  // Calculate average rating (default to 0 if no reviews)
  const avgRating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);
  
  // Respond with book details, average rating, and all reviews
  res.json({ book, avgRating, reviews });
};

/**
 * @route   GET /api/search?query=...
 * @desc    Search for books by partial title or author match (case-insensitive)
 * @access  Public
 */
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  
  // Create case-insensitive regular expression for matching
  const regex = new RegExp(query, "i");
  
  // Find books where title or author matches the query
  const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
  
  // Respond with search results
  res.json(books);
};