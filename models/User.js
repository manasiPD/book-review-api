// Import Mongoose for schema and MongoDB interaction
const mongoose = require("mongoose");

// Import bcrypt for password hashing and verification
const bcrypt = require("bcrypt");


// Define the schema for a User document
const userSchema = new mongoose.Schema({

  // Username field: required and unique to prevent duplicates
  username: { type: String, required: true, unique: true },

  // Password field: required (will be stored as a hashed string)
  password: { type: String, required: true }
});


// Pre-save middleware to hash the password before saving to database
// Runs only if the password field is new or modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the plain text password with bcrypt and salt rounds = 10
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

/**
 * Method to compare a candidate password with the hashed password stored
 * @param {string} candidatePassword - Password to verify
 * @returns {Promise<boolean>} - Resolves to true if passwords match, else false
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


// Export the User model to use in other parts of the application
module.exports = mongoose.model("User", userSchema);