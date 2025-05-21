// Import Mongoose for connecting to MongoDB
const mongoose = require("mongoose");

// Export a function to establish a database connection
module.exports = () => {
  // Connect to MongoDB using the connection string stored in the environment variable
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,       // Use the new URL parser instead of the deprecated one
    useUnifiedTopology: true     // Use the new Server Discovery and Monitoring engine
  }).then(() => console.log("MongoDB Connected"))    // Log success message
    .catch(err => console.error("DB Error", err));   // Log connection errors
};