// Import the Express app from the app.js file
const app = require("./app");

// Define the port number from environment variables or use default 3000
const PORT = process.env.PORT || 3000;

// Start the Express server and listen for incoming requests on the defined port
// Once the server starts successfully, log the port number to the console
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});