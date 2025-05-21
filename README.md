# Book Review API

A RESTful API built with Node.js, Express, MongoDB, and JWT for a basic Book Review system.  
This API supports user authentication, book management, and review operations.

---

## Features

- **User Authentication**: Signup and login with JWT-based authentication.
- **Books**: Add, fetch (with pagination and filters), get details (including average rating and reviews).
- **Reviews**: Add, update, and delete reviews (one review per user per book).
- **Search**: Search books by title or author (case-insensitive and partial matches).
- **Protected Routes**: Certain routes require a valid JWT token.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt (for password hashing)
- dotenv (for environment variables)

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/) or any API testing tool (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manasiPD/book-review-api.git
   cd book-review-api
